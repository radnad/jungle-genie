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

const leafIcon = (stroke: string) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ position: 'absolute', top: 18, right: 18, opacity: 0.5 }}>
    <path d="M12 21V9M12 9C12 5 9 3 5 3c0 4 3 6 7 6Zm0 0c0-4 3-6 7-6 0 4-3 6-7 6Z" stroke={stroke} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);

const CATEGORIES = [
  { label: 'Plants', sub: 'Leafy companions for every room', href: '/shop?department=Plants', bg: '#84994F', fg: '#FBF7EA', icon: leafIcon('#FBF7EA') },
  { label: 'Succulents', sub: 'Easy, sculptural, sun-loving', href: '/shop?department=Succulents', bg: '#B45253', fg: '#FBF7EA', icon: leafIcon('#FBF7EA') },
  { label: 'Decorations', sub: 'Hand painted pots and cosy touches', href: '/shop?department=Decorations', bg: '#FCB53B', fg: '#33401C', icon: leafIcon('#33401C') },
  { label: 'Supplies', sub: 'Pots, soil, tools, and feed', href: '/shop?department=Supplies', bg: '#33401C', fg: '#FBF7EA', icon: leafIcon('#FCB53B') },
  { label: 'Arrangements', sub: 'Made to gift and celebrate', href: '/shop?department=Arrangements', bg: '#F2ECD9', fg: '#33401C', icon: leafIcon('#33401C') },
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
          <div className="mb-6">
            <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
              Explore the shop
            </p>
            <h2 className="font-wonderia font-normal m-0 text-olive-deep" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
              Shop by category
            </h2>
          </div>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))' }}>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                href={cat.href}
                className="relative overflow-hidden rounded-lg no-underline flex flex-col justify-end p-6 shadow-warm transition-transform duration-200 hover:-translate-y-1"
                style={{ background: cat.bg, color: cat.fg, minHeight: '160px' }}
              >
                {cat.icon}
                <span className="font-wonderia text-[26px] leading-none">{cat.label}</span>
                <span className="text-[13px] mt-1 mb-3" style={{ opacity: cat.fg === '#33401C' ? 0.78 : 0.85 }}>
                  {cat.sub}
                </span>
                <span
                  className="self-start font-fraunces font-semibold text-[13px] px-3.5 py-1.5 rounded-pill"
                  style={{ background: cat.fg === '#33401C' ? 'rgba(51,64,28,.12)' : 'rgba(251,247,234,.2)', color: cat.fg }}
                >
                  Shop {cat.label} →
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

            <div className="text-center mt-10">
              <p className="text-muted text-[16px] m-0 mb-3">Want to choose your own trio?</p>
              <Link
                href="/bundles#build"
                className="inline-flex items-center gap-2 font-fraunces font-semibold text-base no-underline rounded-pill px-7 py-3.5 shadow-warm transition-all duration-150 text-cream"
                style={{ background: '#33401C' }}
              >
                <SparkleIcon size={16} color="#FCB53B" />
                Create your own 3 Wishes
              </Link>
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

        {/* OUR STORY */}
        <section
          className="px-[5vw] py-16"
          style={{ background: 'linear-gradient(180deg, var(--cream), #FFF3D6)' }}
        >
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-6">
              <p className="inline-flex items-center gap-2 font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-2">
                <SparkleIcon />
                From our windowsill to yours
              </p>
              <h2
                className="font-wonderia font-normal m-0 text-olive-deep"
                style={{ fontSize: 'clamp(34px,5vw,54px)' }}
              >
                Our Story
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-ink text-[17px] leading-[1.75] m-0">
                It started, like most good things do, with a single pot on a windowsill. Mohamed never set out to build a jungle. He just could not stop. One plant became ten, ten became a corner, and the corner quietly took over until a whole patch of green was thriving under his care.
              </p>
              <p className="text-ink text-[17px] leading-[1.75] m-0">
                He fell for the tricky ones, the rare and the stubborn, the species most people are told not to bother with. He learned their moods, coaxed out new leaves, and watched them grow into something wild and beautiful. Soon there were tiny ecosystems on every shelf, little worlds of moss and root, and buds raised by hand and ready to find a home.
              </p>
              <p className="text-ink text-[17px] leading-[1.75] m-0">
                Jungle Genie grew out of that love. What began as a hobby became a wish worth sharing: to put a little piece of that green magic in your hands, and to help it flourish wherever you are. Every plant we send carries a bit of that same care Mohamed gave the very first one.
              </p>
              <p className="text-center font-fraunces font-semibold text-[19px] text-olive-deep leading-[1.6] m-0 mt-2">
                Welcome to the jungle. We are glad you wished your way here.
              </p>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
