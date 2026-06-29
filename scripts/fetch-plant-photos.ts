import fs from 'fs';
import path from 'path';

// Load .env.local for PEXELS_API_KEY
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
  for (const line of lines) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

const PRODUCTS_PATH = path.resolve(process.cwd(), 'content/products.json');
const API_KEY = process.env.PEXELS_API_KEY;

interface PexelsPhoto {
  src: {
    large2x: string;
    medium: string;
  };
  photographer: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
}

interface Product {
  id: string;
  name: string;
  imageUrl?: string;
  gallery?: string[];
  photographer?: string;
  [key: string]: unknown;
}

async function fetchPhoto(query: string): Promise<{ imageUrl: string; thumb: string; photographer: string } | null> {
  if (!API_KEY) {
    console.error('PEXELS_API_KEY not set in environment');
    return null;
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + ' plant')}&per_page=1&orientation=portrait`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    if (!res.ok) {
      console.warn(`  Pexels returned ${res.status} for "${query}"`);
      return null;
    }

    const data = (await res.json()) as PexelsResponse;
    const photo = data.photos?.[0];

    if (!photo) {
      console.warn(`  No results for "${query}"`);
      return null;
    }

    return {
      imageUrl: photo.src.large2x,
      thumb: photo.src.medium,
      photographer: photo.photographer,
    };
  } catch (err) {
    console.error(`  Error fetching "${query}":`, err);
    return null;
  }
}

async function main() {
  if (!API_KEY) {
    console.error('Set PEXELS_API_KEY in .env.local before running this script.');
    process.exit(1);
  }

  const raw = fs.readFileSync(PRODUCTS_PATH, 'utf-8');
  const products: Product[] = JSON.parse(raw);

  let updated = 0;

  for (const product of products) {
    if (product.imageUrl && product.imageUrl.length > 0) {
      console.log(`  Skipping ${product.name} (already has image)`);
      continue;
    }

    console.log(`  Fetching photo for: ${product.name}`);
    const result = await fetchPhoto(product.name as string);

    if (result) {
      product.imageUrl = result.imageUrl;
      product.gallery = [result.thumb];
      product.photographer = result.photographer;
      updated++;
      console.log(`  Got photo by ${result.photographer}`);
    }

    // Respect Pexels rate limit (200 req/hour on free tier)
    await new Promise(r => setTimeout(r, 400));
  }

  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2));
  console.log(`\nDone. Updated ${updated} products.`);
  console.log('Photos are now cached in content/products.json.');
  console.log('To swap a photo, paste a URL into the "imageUrl" field for that product.');
}

main();
