'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlantImage from '@/components/PlantImage';
import CareBadge from '@/components/CareBadge';
import QtyStepper from '@/components/QtyStepper';
import WishBundleCard from '@/components/WishBundleCard';
import ProductCard from '@/components/ProductCard';
import SparkleIcon from '@/components/SparkleIcon';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { formatEGP } from '@/lib/format';
import type { Product, WishBundle } from '@/lib/types';

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
  crossSellBundle?: WishBundle;
  crossSellPlants?: [Product | undefined, Product | undefined, Product | undefined];
}

export default function ProductClient({
  product,
  relatedProducts,
  crossSellBundle,
  crossSellPlants,
}: ProductClientProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImg, setSelectedImg] = useState(0);

  const liked = has(product.id);
  const onSale = product.salePriceEGP != null;

  const images = [
    product.imageUrl,
    ...(product.gallery || []),
  ].filter(Boolean) as string[];

  const handleAdd = () => {
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        family: product.family,
        priceEGP: product.priceEGP,
        imageUrl: product.imageUrl || '',
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <>
      {/* main */}
      <section
        className="max-w-[1280px] mx-auto px-[5vw] pt-6 pb-4 flex flex-wrap gap-11 items-start"
      >
        {/* gallery */}
        <div style={{ flex: '1 1 380px', minWidth: '300px' }}>
          <div
            className="relative w-full rounded-lg overflow-hidden shadow-warm bg-canvas-alt"
            style={{ height: 'clamp(340px,40vw,520px)' }}
          >
            <PlantImage
              src={images[selectedImg]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2.5 mt-2.5">
              {images.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className="relative rounded-xl overflow-hidden bg-canvas-alt border-2 transition-colors cursor-pointer p-0"
                  style={{
                    height: '84px',
                    borderColor: selectedImg === i ? '#84994F' : 'transparent',
                  }}
                >
                  <PlantImage
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    sizes="10vw"
                  />
                </button>
              ))}
            </div>
          )}
          {images.length === 0 && (
            <div className="grid grid-cols-4 gap-2.5 mt-2.5">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="h-[84px] rounded-xl bg-canvas-alt" />
              ))}
            </div>
          )}
        </div>

        {/* info */}
        <div style={{ flex: '1 1 360px', minWidth: '300px' }}>
          <span
            className="inline-block font-fraunces font-semibold text-[12px] tracking-[.04em] px-3.5 py-1.5 rounded-pill"
            style={{ background: 'rgba(180,82,83,.12)', color: '#B45253' }}
          >
            {product.family}
          </span>

          <h1
            className="font-wonderia font-normal m-0 mt-3.5 mb-3 text-olive-deep"
            style={{ fontSize: 'clamp(38px,5vw,58px)', lineHeight: 1 }}
          >
            {product.name}
          </h1>

          {product.description && (
            <p className="text-[17px] leading-[1.55] text-muted m-0 mb-4" style={{ maxWidth: '46ch' }}>
              {product.description}
            </p>
          )}

          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-fraunces font-semibold text-[32px] text-ink font-lining">
              {formatEGP(product.priceEGP)} EGP
            </span>
            {onSale && (
              <span className="font-fraunces text-[18px] line-through text-marigold font-lining">
                {formatEGP(product.salePriceEGP!)}
              </span>
            )}
            <span
              className="font-fraunces font-semibold text-[12px] px-3 py-1 rounded-pill text-olive"
              style={{ background: 'rgba(132,153,79,.12)' }}
            >
              In stock
            </span>
          </div>

          <CareBadge {...product.care} />

          {/* qty + add */}
          <div className="flex gap-3.5 flex-wrap items-center mt-6 mb-4">
            <QtyStepper value={qty} onChange={setQty} />
            <button
              onClick={handleAdd}
              className="flex-1 font-fraunces font-semibold text-base border-none rounded-pill cursor-pointer px-6 py-3.5 shadow-warm transition-all duration-150"
              style={{
                minWidth: '200px',
                background: added ? '#FCB53B' : '#84994F',
                color: added ? '#33401C' : '#FBF7EA',
              }}
              onMouseEnter={e => {
                if (!added) {
                  e.currentTarget.style.background = '#FCB53B';
                  e.currentTarget.style.color = '#33401C';
                }
              }}
              onMouseLeave={e => {
                if (!added) {
                  e.currentTarget.style.background = '#84994F';
                  e.currentTarget.style.color = '#FBF7EA';
                }
              }}
            >
              {added ? 'Wish granted ✓' : 'Add to cart'}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggle(product.id)}
              className="flex items-center gap-2 font-fraunces text-[14px] bg-none border-none cursor-pointer p-0 text-muted hover:text-rose-clay transition-colors"
              style={{ color: liked ? '#B45253' : undefined }}
            >
              {liked ? (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M12 21s-7-5-9.5-9.2C.8 8.9 2.2 5.5 5.4 5.5c1.9 0 3.1 1 3.9 2.1.8-1.1 2-2.1 3.9-2.1 3.2 0 4.6 3.4 2.9 6.3C19 16 12 21 12 21Z" fill="#B45253" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 20s-6.5-4.6-9-8.6C1.5 9 2.7 6.3 5.5 6.3c1.8 0 2.9 1 3.6 2 .7-1 1.8-2 3.6-2 2.8 0 4 2.7 2.5 5.1C18.5 15.4 12 20 12 20Z" stroke="#B45253" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              )}
              {liked ? 'Saved' : 'Save to wishlist'}
            </button>
            <Link
              href="/cart"
              className="font-fraunces text-[14px] text-marigold-deep no-underline pb-0.5"
              style={{ borderBottom: '1.5px solid #FCB53B' }}
            >
              View cart →
            </Link>
          </div>
        </div>
      </section>

      {/* WISH cross-sell */}
      {crossSellBundle && crossSellPlants && (
        <section className="max-w-[1280px] mx-auto px-[5vw] py-9">
          <div
            className="rounded-lg p-7 flex flex-wrap gap-7 items-center border"
            style={{
              background: 'linear-gradient(150deg,#FFF6D6,#FBF7EA 70%)',
              borderColor: 'rgba(252,181,59,.45)',
              boxShadow: '0 8px 26px rgba(224,154,36,.14)',
            }}
          >
            <div style={{ flex: '1 1 320px', minWidth: '280px' }}>
              <p className="inline-flex items-center gap-2 font-fraunces font-semibold tracking-[.14em] uppercase text-[12px] text-marigold-deep m-0 mb-2">
                <SparkleIcon />
                Part of a Wish bundle?
              </p>
              <h2
                className="font-wonderia font-normal m-0 mb-2.5 text-olive-deep"
                style={{ fontSize: 'clamp(26px,3.5vw,38px)' }}
              >
                Make it the {crossSellBundle.wishLabel} trio
              </h2>
              <p className="text-[16px] leading-[1.55] text-muted m-0 mb-4" style={{ maxWidth: '48ch' }}>
                {crossSellBundle.description}
                {' '}Granted together for{' '}
                <strong className="text-ink">{formatEGP(crossSellBundle.bundlePriceEGP)} EGP</strong>.
              </p>
            </div>
            <div style={{ flex: '0 1 300px', minWidth: '260px' }}>
              <WishBundleCard bundle={crossSellBundle} plants={crossSellPlants} />
            </div>
          </div>
        </section>
      )}

      {/* care notes */}
      <section className="max-w-[1280px] mx-auto px-[5vw] pt-6 pb-4">
        <h2
          className="font-wonderia font-normal m-0 mb-4 text-olive-deep"
          style={{ fontSize: 'clamp(26px,3.5vw,38px)' }}
        >
          Care notes
        </h2>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {[
            {
              label: 'Light',
              body: `Provide ${product.care.light} light. Avoid harsh midday sun on delicate foliage.`,
            },
            {
              label: 'Water',
              body: `Water ${product.care.water}. Let the top inch of soil dry before watering - roots dislike sitting wet.`,
            },
            {
              label: 'A little extra',
              body: product.care.petSafe
                ? 'Safe for cats and dogs. Still best to keep out of reach - no plant likes being chewed!'
                : 'Keep away from pets and small children. Wash hands after handling.',
            },
          ].map(note => (
            <div key={note.label} className="bg-white border border-line rounded-md p-5">
              <p className="font-fraunces font-semibold text-marigold-deep m-0 mb-2">{note.label}</p>
              <p className="m-0 text-[15px] leading-relaxed text-ink">{note.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* related */}
      {relatedProducts.length > 0 && (
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-10 pb-6">
          <h2
            className="font-wonderia font-normal m-0 mb-6 text-olive-deep"
            style={{ fontSize: 'clamp(28px,4vw,42px)' }}
          >
            You may also wish for
          </h2>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
