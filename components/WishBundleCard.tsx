'use client';

import { useState } from 'react';
import PlantImage from './PlantImage';
import { useCart } from '@/lib/cart-context';
import { formatEGP } from '@/lib/format';
import type { WishBundle, Product } from '@/lib/types';

interface WishBundleCardProps {
  bundle: WishBundle;
  plants: [Product | undefined, Product | undefined, Product | undefined];
}

export default function WishBundleCard({ bundle, plants }: WishBundleCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleGrant = () => {
    addItem(
      {
        id: `bundle-${bundle.id}`,
        slug: bundle.slug,
        name: `${bundle.name} - ${bundle.wishLabel}`,
        family: 'Bundle',
        priceEGP: bundle.bundlePriceEGP,
        imageUrl: plants[0]?.imageUrl || '',
        isBundle: true,
        bundleLabel: bundle.wishLabel,
      },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className="relative flex flex-col h-full rounded-lg overflow-hidden border transition-all duration-200 cursor-default"
      style={{
        background: 'linear-gradient(160deg,#FFF6D6 0%,#FBF7EA 60%)',
        borderColor: 'rgba(252,181,59,.45)',
        boxShadow: '0 8px 26px rgba(224,154,36,.16)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 38px rgba(224,154,36,.24)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '0 8px 26px rgba(224,154,36,.16)';
      }}
    >
      {/* ribbon */}
      <div
        className="absolute top-4 left-0 z-10 flex items-center gap-1.5 font-fraunces font-semibold text-xs tracking-[.06em] px-3.5 py-1.5 text-olive-deep"
        style={{
          background: '#FCB53B',
          borderRadius: '0 999px 999px 0',
          boxShadow: '0 3px 10px rgba(224,154,36,.3)',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" className="animate-sparkle">
          <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" fill="#33401C" />
        </svg>
        3 WISHES
      </div>

      {/* sparkle accents */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className="absolute top-14 right-5 animate-sparkle-slow pointer-events-none"
      >
        <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" fill="#FCB53B" />
      </svg>
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        className="absolute top-[88px] right-12 animate-sparkle-fast pointer-events-none"
      >
        <path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z" fill="#E09A24" />
      </svg>

      {/* thumbnails */}
      <div className="grid grid-cols-3 gap-1.5 p-1.5 pt-14">
        {plants.map((plant, i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden bg-canvas-alt"
            style={{ height: '118px' }}
          >
            <PlantImage
              src={plant?.imageUrl}
              alt={plant?.name || 'Plant'}
              fill
              sizes="(max-width: 640px) 33vw, 15vw"
            />
          </div>
        ))}
      </div>

      {/* info */}
      <div className="p-5 pb-6 flex flex-col gap-2 flex-1">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="font-wonderia font-normal text-[26px] leading-none m-0 text-olive-deep">
            {bundle.name}
          </h3>
          <span className="font-fraunces italic text-[15px] text-marigold-deep">
            {bundle.wishLabel}
          </span>
        </div>

        <div className="flex flex-col gap-1 my-1">
          {plants.map((plant, i) => (
            <div key={i} className="flex items-center gap-2 text-[14px] text-ink">
              <span className="text-olive text-[13px]">✦</span>
              {plant?.name || '...'}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2.5 mt-auto">
          <span className="font-fraunces font-semibold text-2xl text-ink font-lining">
            {formatEGP(bundle.bundlePriceEGP)} EGP
          </span>
          <span
            className="font-fraunces font-semibold text-xs px-3 py-1 rounded-pill text-olive-deep"
            style={{ background: '#FCB53B' }}
          >
            {bundle.saveText}
          </span>
        </div>

        <button
          onClick={handleGrant}
          className="mt-2 font-fraunces font-semibold text-[15px] border-none rounded-pill cursor-pointer w-full py-3 flex items-center justify-center gap-2 transition-all duration-150"
          style={{
            background: added ? '#FCB53B' : '#33401C',
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
              e.currentTarget.style.background = '#33401C';
              e.currentTarget.style.color = '#FBF7EA';
            }
          }}
        >
          {added ? 'Wish granted ✓' : 'Grant this wish'}
        </button>
      </div>
    </div>
  );
}
