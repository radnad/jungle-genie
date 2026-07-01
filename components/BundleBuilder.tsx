'use client';

import { useState, useMemo } from 'react';
import PlantImage from './PlantImage';
import SparkleIcon from './SparkleIcon';
import { useCart } from '@/lib/cart-context';
import { formatEGP } from '@/lib/format';
import productsData from '@/content/products.json';
import type { Product } from '@/lib/types';

const products = productsData as unknown as Product[];

// Only in-stock items can be chosen for a build-your-own bundle.
const inStockProducts = products.filter(p => p.id && p.inStock !== false);

const DEPARTMENTS = ['Plants', 'Succulents', 'Decorations', 'Supplies', 'Arrangements'];

function Selector({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-fraunces font-semibold text-[13px] text-olive-deep">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="font-fraunces text-[14px] text-ink bg-white border border-line rounded-md px-3 py-3 cursor-pointer outline-none focus:border-olive"
      >
        <option value="">Choose an item</option>
        {DEPARTMENTS.map(dept => {
          const opts = inStockProducts.filter(p => (p.department || 'Plants') === dept);
          if (opts.length === 0) return null;
          return (
            <optgroup key={dept} label={dept}>
              {opts.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} - {formatEGP(p.priceEGP)} EGP
                </option>
              ))}
            </optgroup>
          );
        })}
      </select>
    </label>
  );
}

export default function BundleBuilder() {
  const { addItem } = useCart();
  const [picks, setPicks] = useState<[string, string, string]>(['', '', '']);
  const [added, setAdded] = useState(false);

  const setPick = (i: number, v: string) => {
    setPicks(prev => {
      const next = [...prev] as [string, string, string];
      next[i] = v;
      return next;
    });
    setAdded(false);
  };

  const chosen = picks.map(id => inStockProducts.find(p => p.id === id));
  const chosenCount = chosen.filter(Boolean).length;
  const total = useMemo(
    () => chosen.reduce((sum, p) => sum + (p?.priceEGP || 0), 0),
    [picks],
  );
  const ready = chosenCount === 3;

  const handleAdd = () => {
    if (!ready) return;
    const names = chosen.map(p => p!.name).join(', ');
    addItem(
      {
        id: `custom-bundle-${Date.now()}`,
        slug: 'bundles',
        name: 'My 3 Wishes bundle',
        family: 'Bundle',
        priceEGP: total,
        imageUrl: chosen[0]?.imageUrl || '',
        isBundle: true,
        bundleLabel: names,
      },
      1,
    );
    setAdded(true);
    setPicks(['', '', '']);
  };

  return (
    <div
      className="rounded-lg border p-6 md:p-8"
      style={{
        background: 'linear-gradient(160deg,#FFF6D6 0%,#FBF7EA 60%)',
        borderColor: 'rgba(252,181,59,.45)',
        boxShadow: '0 8px 26px rgba(224,154,36,.16)',
      }}
    >
      <div className="text-center mb-6">
        <p className="inline-flex items-center gap-2 font-fraunces font-semibold tracking-[.14em] uppercase text-[12px] text-marigold-deep m-0 mb-2">
          <SparkleIcon />
          Build your own
        </p>
        <h3 className="font-wonderia font-normal m-0 text-olive-deep" style={{ fontSize: 'clamp(28px,4vw,44px)' }}>
          Make your three wishes
        </h3>
        <p className="text-muted text-[15px] max-w-[48ch] mx-auto mt-2 leading-relaxed m-0">
          Pick any three in-stock treasures we sell, and we will grant them together in one happy little bundle.
        </p>
      </div>

      <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
        <Selector label="First wish" value={picks[0]} onChange={v => setPick(0, v)} />
        <Selector label="Second wish" value={picks[1]} onChange={v => setPick(1, v)} />
        <Selector label="Third wish" value={picks[2]} onChange={v => setPick(2, v)} />
      </div>

      {/* chosen preview */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {chosen.map((p, i) => (
          <div key={i} className="bg-white/70 border border-line rounded-md p-2 flex flex-col items-center text-center">
            <div className="relative w-full rounded-md overflow-hidden bg-canvas-alt mb-2" style={{ height: '92px' }}>
              {p ? (
                <PlantImage src={p.imageUrl} alt={p.name} fill sizes="120px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <SparkleIcon size={20} color="#E7DFC8" />
                </div>
              )}
            </div>
            <span className="font-fraunces text-[12px] text-ink leading-tight line-clamp-2">
              {p ? p.name : `Wish ${i + 1}`}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <span className="font-fraunces text-[13px] text-muted">Your bundle total</span>
          <div className="font-fraunces font-semibold text-[26px] text-ink font-lining leading-tight">
            {formatEGP(total)} EGP
          </div>
        </div>
        <button
          onClick={handleAdd}
          disabled={!ready}
          className="font-fraunces font-semibold text-[15px] border-none rounded-pill px-7 py-3.5 transition-all duration-150"
          style={{
            background: added ? '#FCB53B' : ready ? '#33401C' : '#E7DFC8',
            color: added ? '#33401C' : ready ? '#FBF7EA' : '#5A6147',
            cursor: ready ? 'pointer' : 'not-allowed',
          }}
        >
          {added ? 'Wish granted ✓' : ready ? 'Add my wish bundle to cart' : `Pick ${3 - chosenCount} more`}
        </button>
      </div>
    </div>
  );
}
