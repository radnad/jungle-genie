import Link from 'next/link';
import Image from 'next/image';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ProductCard from '@/components/ProductCard';
import WishBundleCard from '@/components/WishBundleCard';
import LeafyDivider from '@/components/LeafyDivider';
import SparkleIcon from '@/components/SparkleIcon';
import productsData from '@/content/products.json';
import bundlesData from '@/content/bundles.json';
import site from '@/content/site.json';
import type { Product, WishBundle } from '@/lib/types';

const products = productsData as unknown as Product[];
const bundles = bundlesData as unknown as WishBundle[];

function getPlants(bundle: WishBundle): [Product | undefined, Product | undefined, Product | undefined] {
  return [
    products.find(p => p.id === bundle.plantIds[0]),
    products.find(p => p.id === bundle.plantIds[1]),
    products.find(p => p.id === bundle.plantIds[2]),
  ];
}

const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
const featuredBundles = bundles.slice(0, 3);

const CATEGORIES = [
  {
    label: 'Indoor',
    sub: 'Leafy companions for every room',
    href: '/shop',
    bg: '#84994F',
    fg: '#FBF7EA',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
        <path d="M12 21V9M12 9C12 5 9 3 5 3c0 4 3 6 7 6Zm0 0c0-4 3-6 7-6 0 4-3 6-7 6Z" stroke="#FBF7EA" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Rare finds',
    sub: 'For the collector’s shelf',
    href: '/shop?subcategory=Rare',
    bg: '#B45253',
    fg: '#FBF7EA',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
        <path d="M12 3l2.5 5 5.5.8-4 3.9 1 5.5L12 16l-5 2.6 1-5.5-4-3.9 5.5-.8z" stroke="#FBF7EA" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Low-light',
    sub: 'Thrive in dim corners',
    href: '/shop?tag=low-light',
    bg: '#F2ECD9',
    fg: '#33401C',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 18, right: 18, opacity: 0.4 }}>
        <path d="M5 21c0-6 3-9 7-9M19 21c0-6-3-9-7-9m0 0V4" stroke="#33401C" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Pet-friendly',
    sub: 'Safe for cats and dogs',
    href: '/shop?tag=pet-safe',
    bg: '#33401C',
    fg: '#FBF7EA',
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
        <path d="M12 21c-5-3-8-6-8-10a4 4 0 017-2 4 4 0 017 2c0 4-3 7-8 10Z" stroke="#FCB53B" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen">

        {/* HERO */}
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-12 pb-6 flex flex-wrap gap-10 items-center">
          <div style={{ flex: '1 1 360px', minWidth: '300px' }}>
            <p className="inline-flex items-center gap-2 font-fraunces font-semibold tracking-[.18em] uppercase text-[12px] text-marigold-deep m-0 mb-4 px-3.5 py-1.5 rounded-pill"
              style={{ background: '#FFE797' }}
            >
              <SparkleIcon />
              {site.tagline}
            </p>
            <h1
              className="font-wonderia font-normal m-0 mb-5 text-olive-deep"
              style={{ fontSize: 'clamp(48px,7vw,88px)', lineHeight: '0.98', textWrap: 'balance' }}
            >
              {site.heroHeadline}
            </h1>
            <p
              className="text-muted m-0 mb-7 leading-[1.55]"
              style={{ fontSize: 'clamp(17px,2vw,20px)', maxWidth: '42ch' }}
            >
              Rare leaves, easy companions and curated{' '}
              <em className="text-marigold-deep not-italic">3&nbsp;Wishes</em>{' '}
              trios - chosen with care and delivered across Egypt.
            </p>
            <div className="flex gap-3.5 flex-wrap">
              <Link
                href="/shop"
                className="font-fraunces font-semibold text-base no-underline rounded-pill px-7 py-3.5 shadow-warm transition-all duration-150 text-cream"
                style={{ background: '#84994F' }}
                onMouseEnter={undefined}
              >
                {site.heroCTA}
              </Link>
              <Link
                href="#wishes"
                className="font-fraunces font-semibold text-base no-underline rounded-pill px-7 py-3.5 border border-marigold text-marigold-deep bg-transparent transition-all duration-150 hover:bg-marigold hover:text-olive-deep"
                style={{ border: '1.5px solid #FCB53B' }}
              >
                {site.heroSecondaryCTA} ✦
              </Link>
            </div>
          </div>

          <div style={{ flex: '1 1 360px', minWidth: '300px', position: 'relative' }}>
            {/* Hero photo lives at public/hero.jpg. Replace that file to change it. */}
            <div
              className="relative w-full rounded-lg overflow-hidden bg-canvas-alt shadow-warm"
              style={{ height: 'clamp(320px,42vw,520px)' }}
            >
              <Image
                src="/hero.jpg"
                alt="A lush bowl of mixed succulents, freshly potted"
                fill
                priority
                sizes="(max-width: 800px) 90vw, 560px"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div
              className="absolute bottom-4 left-4 rounded-md px-4 py-3 shadow-warm flex items-center gap-2.5"
              style={{ background: 'rgba(251,247,234,.94)', backdropFilter: 'blur(6px)' }}
            >
              <SparkleIcon size={20} color="#FCB53B" className="animate-sparkle-slow" />
              <span className="font-fraunces font-medium text-[14px] text-olive-deep">
                {site.healthyArrivalPromise}
              </span>
            </div>
          </div>
        </section>

        {/* CATEGORY TILES */}
        <section className="max-w-[1280px] mx-auto px-[5vw] py-9">
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))' }}>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                href={cat.href}
                className="relative overflow-hidden rounded-lg no-underline flex flex-col justify-end p-6 shadow-warm transition-transform duration-200 hover:-translate-y-1"
                style={{ background: cat.bg, color: cat.fg, minHeight: '150px' }}
              >
                {cat.icon}
                <span className="font-wonderia text-[26px] leading-none">{cat.label}</span>
                <span className="text-[13px] mt-1" style={{ opacity: cat.bg === '#F2ECD9' ? 0.75 : 0.85 }}>
                  {cat.sub}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3 WISHES */}
        <section
          id="wishes"
          className="px-[5vw] py-14"
          style={{ background: 'linear-gradient(180deg,var(--cream),#FFF9E4 50%,var(--cream))' }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-9">
              <p className="inline-flex items-center gap-2 font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-2">
                <SparkleIcon />
                The signature trios
              </p>
              <h2
                className="font-wonderia font-normal m-0 text-olive-deep"
                style={{ fontSize: 'clamp(34px,5vw,56px)' }}
              >
                Make three wishes
              </h2>
              <p className="text-muted text-[17px] max-w-[46ch] mx-auto mt-3.5 leading-[1.55]">
                Curated plant trios that just belong together - granted at a friendlier price.
              </p>
            </div>
            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
              {featuredBundles.map(bundle => (
                <WishBundleCard key={bundle.id} bundle={bundle} plants={getPlants(bundle)} />
              ))}
            </div>
          </div>
        </section>

        {/* NEW ARRIVALS */}
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-14 pb-6">
          <div className="flex items-end justify-between gap-4 flex-wrap mb-7">
            <div>
              <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
                Fresh from the genie
              </p>
              <h2
                className="font-wonderia font-normal m-0 text-olive-deep"
                style={{ fontSize: 'clamp(30px,4vw,46px)' }}
              >
                New arrivals
              </h2>
            </div>
            <Link
              href="/shop"
              className="font-fraunces font-semibold text-[15px] text-olive no-underline pb-0.5"
              style={{ borderBottom: '1.5px solid #FCB53B' }}
            >
              Shop all →
            </Link>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))' }}>
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <LeafyDivider />
        <SiteFooter />
      </main>
    </>
  );
}
