'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/lib/wishlist-context';
import productsData from '@/content/products.json';
import type { Product } from '@/lib/types';

const products = productsData as unknown as Product[];

export default function WishlistPage() {
  const { ids } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const items = ids
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen">
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-10 pb-2">
          <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
            Saved for later
          </p>
          <h1 className="font-wonderia font-normal m-0 text-olive-deep" style={{ fontSize: 'clamp(36px,5vw,58px)' }}>
            Your wishlist
          </h1>
          {mounted && items.length > 0 && (
            <p className="text-muted text-[15px] mt-2 m-0">
              Tap the heart on a card to remove it. Your wishes are saved on this device.
            </p>
          )}
        </section>

        <section className="max-w-[1280px] mx-auto px-[5vw] pt-6 pb-16">
          {mounted && items.length > 0 ? (
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
              {items.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3.5">
                <path
                  d="M12 20s-6.5-4.6-9-8.6C1.5 9 2.7 6.3 5.5 6.3c1.8 0 2.9 1 3.6 2 .7-1 1.8-2 3.6-2 2.8 0 4 2.7 2.5 5.1C18.5 15.4 12 20 12 20Z"
                  stroke="#B45253"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="font-wonderia text-[28px] text-olive-deep m-0 mb-1.5">No wishes saved yet</p>
              <p className="text-muted m-0 mb-5">Tap the heart on any product to save it here for later.</p>
              <Link
                href="/shop"
                className="inline-block font-fraunces font-semibold text-[15px] no-underline rounded-pill px-7 py-3 text-cream"
                style={{ background: '#84994F' }}
              >
                Browse the shop
              </Link>
            </div>
          )}
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
