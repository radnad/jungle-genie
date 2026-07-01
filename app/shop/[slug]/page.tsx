import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import LeafyDivider from '@/components/LeafyDivider';
import ProductClient from './ProductClient';
import productsData from '@/content/products.json';
import bundlesData from '@/content/bundles.json';
import type { Product, WishBundle } from '@/lib/types';

const products = productsData as unknown as Product[];
const bundles = bundlesData as unknown as WishBundle[];

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) return { title: 'Not found' };
  return {
    title: `${product.name} - Jungle Genie`,
    description: product.description || `${product.name} - ${product.family}.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter(p => p.id !== product.id && (p.family === product.family || p.category === product.category))
    .slice(0, 4);

  const crossSellBundle = bundles.find(b => b.plantIds.includes(product.id));
  const crossSellPlants = crossSellBundle
    ? ([
        products.find(p => p.id === crossSellBundle.plantIds[0]),
        products.find(p => p.id === crossSellBundle.plantIds[1]),
        products.find(p => p.id === crossSellBundle.plantIds[2]),
      ] as [Product | undefined, Product | undefined, Product | undefined])
    : undefined;

  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen">
        {/* breadcrumb */}
        <div className="max-w-[1280px] mx-auto px-[5vw] pt-5 text-[13px] text-muted">
          <a href="/" className="text-muted no-underline hover:text-ink transition-colors">Home</a>
          {' · '}
          <a href="/shop" className="text-muted no-underline hover:text-ink transition-colors">Shop</a>
          {' · '}
          <a href="/shop" className="text-muted no-underline hover:text-ink transition-colors">{product.family}</a>
          {' · '}
          <span className="text-ink">{product.name}</span>
        </div>

        <ProductClient
          product={product}
          relatedProducts={related}
          crossSellBundle={crossSellBundle}
          crossSellPlants={crossSellPlants}
        />

        <div className="h-8" />
        <LeafyDivider />
        <SiteFooter />
      </main>
    </>
  );
}
