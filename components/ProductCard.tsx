'use client';

import { useState } from 'react';
import Link from 'next/link';
import PlantImage from './PlantImage';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { formatEGP } from '@/lib/format';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [added, setAdded] = useState(false);

  const liked = has(product.id);
  const onSale = product.salePriceEGP != null;
  const inStock = product.inStock !== false;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      family: product.family,
      priceEGP: product.priceEGP,
      imageUrl: product.imageUrl || '',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <Link href={`/shop/${product.slug}`} className="block group" style={{ textDecoration: 'none' }}>
      <div
        className="bg-white border border-line rounded-lg overflow-hidden shadow-warm flex flex-col h-full transition-transform duration-200"
        style={{ willChange: 'transform' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
        onMouseLeave={e => (e.currentTarget.style.transform = '')}
      >
        <div className="relative">
          <div className="relative w-full h-60 bg-canvas-alt overflow-hidden">
            <PlantImage
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {!inStock ? (
            <span
              className="absolute top-3 left-3 font-fraunces font-semibold text-xs px-3 py-1.5 rounded-pill"
              style={{ background: '#5A6147', color: '#FBF7EA' }}
            >
              Out of stock
            </span>
          ) : (
            onSale && (
              <span className="absolute top-3 left-3 font-fraunces font-semibold text-xs bg-rose-clay text-cream px-3 py-1.5 rounded-pill">
                Sale
              </span>
            )
          )}

          <button
            onClick={e => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
            className="absolute top-3 right-3 w-10 h-10 rounded-full border-none flex items-center justify-center shadow-sm transition-all duration-150 cursor-pointer"
            style={{ background: 'rgba(251,247,234,.92)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'scale(1.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(251,247,234,.92)';
              e.currentTarget.style.transform = '';
            }}
          >
            {liked ? (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M12 21s-7-5-9.5-9.2C.8 8.9 2.2 5.5 5.4 5.5c1.9 0 3.1 1 3.9 2.1.8-1.1 2-2.1 3.9-2.1 3.2 0 4.6 3.4 2.9 6.3C19 16 12 21 12 21Z"
                  fill="#B45253"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 20s-6.5-4.6-9-8.6C1.5 9 2.7 6.3 5.5 6.3c1.8 0 2.9 1 3.6 2 .7-1 1.8-2 3.6-2 2.8 0 4 2.7 2.5 5.1C18.5 15.4 12 20 12 20Z"
                  stroke="#B45253"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2.5 flex-1">
          <span
            className="self-start font-fraunces font-semibold text-[11px] tracking-[.04em] px-3 py-1 rounded-pill"
            style={{ background: 'rgba(180,82,83,.12)', color: '#B45253' }}
          >
            {product.family}
          </span>

          <h3 className="font-wonderia font-normal text-[22px] leading-[1.12] m-0 text-olive-deep text-pretty">
            {product.name}
          </h3>

          <div className="flex items-baseline gap-2.5 mt-auto">
            <span className="font-fraunces font-semibold text-[21px] text-ink font-lining">
              {formatEGP(product.priceEGP)} EGP
            </span>
            {onSale && (
              <span className="font-fraunces text-[15px] line-through text-marigold font-lining">
                {formatEGP(product.salePriceEGP!)}
              </span>
            )}
          </div>

          {inStock ? (
            <button
              onClick={handleAdd}
              className="mt-1.5 font-fraunces font-semibold text-sm border-none rounded-pill cursor-pointer w-full py-3 px-4 transition-all duration-150"
              style={{
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
          ) : (
            <button
              onClick={e => e.preventDefault()}
              disabled
              className="mt-1.5 font-fraunces font-semibold text-sm border-none rounded-pill w-full py-3 px-4"
              style={{ background: '#E7DFC8', color: '#5A6147', cursor: 'not-allowed' }}
            >
              Out of stock
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
