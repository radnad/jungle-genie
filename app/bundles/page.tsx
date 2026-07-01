import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import WishBundleCard from '@/components/WishBundleCard';
import BundleBuilder from '@/components/BundleBuilder';
import SparkleIcon from '@/components/SparkleIcon';
import productsData from '@/content/products.json';
import bundlesData from '@/content/bundles.json';
import type { Product, WishBundle } from '@/lib/types';

const products = productsData as unknown as Product[];
const bundles = bundlesData as unknown as WishBundle[];

export const metadata: Metadata = {
  title: '3 Wishes Bundles - Jungle Genie',
  description: 'Curated plant trios at a friendlier price, or build your own three wishes from anything we sell.',
};

function getPlants(bundle: WishBundle): [Product | undefined, Product | undefined, Product | undefined] {
  return [
    products.find(p => p.id === bundle.plantIds[0]),
    products.find(p => p.id === bundle.plantIds[1]),
    products.find(p => p.id === bundle.plantIds[2]),
  ];
}

export default function BundlesPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen">
        {/* intro */}
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-10 pb-2 text-center">
          <p className="inline-flex items-center gap-2 font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-2">
            <SparkleIcon />
            The signature trios
          </p>
          <h1 className="font-wonderia font-normal m-0 text-olive-deep" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
            Make three wishes
          </h1>
          <p className="text-muted text-[17px] max-w-[48ch] mx-auto mt-3.5 leading-[1.55]">
            Curated trios that just belong together, granted at a friendlier price. Or scroll down and build your own.
          </p>
        </section>

        {/* curated bundles */}
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-8 pb-4">
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
            {bundles.map(bundle => (
              <WishBundleCard key={bundle.id} bundle={bundle} plants={getPlants(bundle)} />
            ))}
          </div>
        </section>

        {/* build your own */}
        <section id="build" className="max-w-[900px] mx-auto px-[5vw] pt-10 pb-16">
          <BundleBuilder />
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
