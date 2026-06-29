'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ProductCard from '@/components/ProductCard';
import productsData from '@/content/products.json';
import type { Product } from '@/lib/types';
import { formatEGP } from '@/lib/format';

const products = productsData as unknown as Product[];

const MAX_PRICE = 3500;
const MIN_PRICE = 150;

const allFamilies = [...new Set(products.map(p => p.family))].sort();

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const CHIP_FAMILIES = ['Monstera', 'Philodendron', 'Alocasia', 'Anthurium', 'Ficus', 'Pothos'];
const SIZE_OPTS = ['Small', 'Medium', 'Large'];
const ENV_OPTS = ['Indoor', 'Outdoor'];

function Chip({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="font-fraunces font-semibold text-[14px] px-4 py-2 rounded-pill cursor-pointer transition-all duration-150 border-[1.5px]"
      style={{
        borderColor: active ? '#84994F' : '#E7DFC8',
        background: active ? '#84994F' : '#fff',
        color: active ? '#FBF7EA' : '#5A6147',
      }}
    >
      {label}
    </button>
  );
}

function CheckRow({ label, count, active, onToggle }: { label: string; count?: number; active: boolean; onToggle: () => void }) {
  return (
    <label onClick={onToggle} className="flex items-center gap-2.5 py-1.5 cursor-pointer text-sm text-ink">
      <span
        className="w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center flex-shrink-0"
        style={{ borderColor: active ? '#84994F' : '#E7DFC8', background: active ? '#84994F' : '#fff' }}
      >
        {active && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4 10-11" stroke="#FBF7EA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="flex-1">{label}</span>
      {count != null && <span className="text-muted text-xs font-lining">{count}</span>}
    </label>
  );
}

function PillBtn({ label, active, onToggle }: { label: string; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="font-fraunces text-[13px] px-3.5 py-1.5 rounded-pill cursor-pointer border-[1.5px] transition-all duration-150"
      style={{
        borderColor: active ? '#84994F' : '#E7DFC8',
        background: active ? '#84994F' : '#fff',
        color: active ? '#FBF7EA' : '#5A6147',
      }}
    >
      {label}
    </button>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sort, setSort] = useState<SortKey>('featured');
  const [selFamilies, setSelFamilies] = useState<string[]>([]);
  const [selSubcategory, setSelSubcategory] = useState<string>('');
  const [selTag, setSelTag] = useState<string>('');
  const [selSize, setSelSize] = useState<string[]>([]);
  const [selEnv, setSelEnv] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync filter state from URL - runs on mount and whenever the URL changes (e.g. clicking a nav link)
  useEffect(() => {
    const familyParam = searchParams.get('family');
    const categoryParam = searchParams.get('category');
    const subcategoryParam = searchParams.get('subcategory');
    const tagParam = searchParams.get('tag');

    setSelFamilies(familyParam ? familyParam.split(',').filter(Boolean) : []);
    setSelEnv(categoryParam ? [categoryParam] : []);
    setSelSubcategory(subcategoryParam || '');
    setSelTag(tagParam || '');
  }, [searchParams]);

  // Build and push a new URL from current filter state
  const pushUrl = (
    families: string[],
    env: string[],
    subcategory: string,
    tag: string,
  ) => {
    const p = new URLSearchParams();
    if (families.length) p.set('family', families.join(','));
    if (env.length === 1) p.set('category', env[0]);
    if (subcategory) p.set('subcategory', subcategory);
    if (tag) p.set('tag', tag);
    const qs = p.toString();
    router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
  };

  const toggleFamily = (fam: string) => {
    const next = selFamilies.includes(fam)
      ? selFamilies.filter(f => f !== fam)
      : [...selFamilies, fam];
    setSelFamilies(next);
    // Family selection clears subcategory/tag nav filters to avoid confusion
    setSelSubcategory('');
    setSelTag('');
    pushUrl(next, selEnv, '', '');
  };

  const toggleEnv = (env: string) => {
    const next = selEnv.includes(env) ? selEnv.filter(e => e !== env) : [...selEnv, env];
    setSelEnv(next);
    pushUrl(selFamilies, next, selSubcategory, selTag);
  };

  const removeSubcategory = () => {
    setSelSubcategory('');
    pushUrl(selFamilies, selEnv, '', selTag);
  };

  const removeTag = () => {
    setSelTag('');
    pushUrl(selFamilies, selEnv, selSubcategory, '');
  };

  const toggleSize = (size: string) => {
    setSelSize(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const clearAll = () => {
    setSelFamilies([]);
    setSelSubcategory('');
    setSelTag('');
    setSelSize([]);
    setSelEnv([]);
    setMaxPrice(MAX_PRICE);
    router.replace('/shop', { scroll: false });
  };

  const famCounts = useMemo(() => {
    const c: Record<string, number> = {};
    products.forEach(p => { c[p.family] = (c[p.family] || 0) + 1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (selFamilies.length && !selFamilies.includes(p.family)) return false;
      if (selEnv.length && !selEnv.includes(p.category)) return false;
      if (selSubcategory && p.subcategory !== selSubcategory) return false;
      if (selTag && !p.tags.includes(selTag)) return false;
      if (selSize.length && !selSize.some(s => p.care.size.toLowerCase().startsWith(s.toLowerCase()))) return false;
      if (p.priceEGP > maxPrice) return false;
      return true;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceEGP - b.priceEGP);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceEGP - a.priceEGP);
    else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [selFamilies, selEnv, selSubcategory, selTag, selSize, maxPrice, sort]);

  const hasActiveFilters = selFamilies.length > 0 || selEnv.length > 0 || selSubcategory || selTag || selSize.length > 0 || maxPrice < MAX_PRICE;

  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen">

        <section className="max-w-[1280px] mx-auto px-[5vw] pt-10 pb-2">
          <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
            All plants
          </p>
          <h1
            className="font-wonderia font-normal m-0 text-olive-deep"
            style={{ fontSize: 'clamp(36px,5vw,60px)' }}
          >
            The whole jungle
          </h1>

          {/* family chips */}
          <div className="flex gap-2.5 flex-wrap mt-5">
            {CHIP_FAMILIES.map(f => (
              <Chip
                key={f}
                label={f}
                active={selFamilies.includes(f)}
                onToggle={() => toggleFamily(f)}
              />
            ))}
          </div>

          {/* active nav-filter badges (subcategory or tag) */}
          {(selSubcategory || selTag || (selEnv.length === 1)) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {selSubcategory && (
                <span
                  className="inline-flex items-center gap-1.5 font-fraunces font-semibold text-[12px] px-3 py-1 rounded-pill"
                  style={{ background: '#84994F', color: '#FBF7EA' }}
                >
                  {selSubcategory}
                  <button
                    onClick={removeSubcategory}
                    className="hover:opacity-70 transition-opacity leading-none"
                    aria-label="Remove filter"
                  >
                    x
                  </button>
                </span>
              )}
              {selTag && (
                <span
                  className="inline-flex items-center gap-1.5 font-fraunces font-semibold text-[12px] px-3 py-1 rounded-pill"
                  style={{ background: '#84994F', color: '#FBF7EA' }}
                >
                  {selTag}
                  <button
                    onClick={removeTag}
                    className="hover:opacity-70 transition-opacity leading-none"
                    aria-label="Remove filter"
                  >
                    x
                  </button>
                </span>
              )}
              {selEnv.length === 1 && (
                <span
                  className="inline-flex items-center gap-1.5 font-fraunces font-semibold text-[12px] px-3 py-1 rounded-pill"
                  style={{ background: '#84994F', color: '#FBF7EA' }}
                >
                  {selEnv[0]}
                  <button
                    onClick={() => { setSelEnv([]); pushUrl(selFamilies, [], selSubcategory, selTag); }}
                    className="hover:opacity-70 transition-opacity leading-none"
                    aria-label="Remove filter"
                  >
                    x
                  </button>
                </span>
              )}
            </div>
          )}
        </section>

        {/* toolbar */}
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-4 flex items-center justify-between gap-3.5 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(o => !o)}
              className="font-fraunces font-semibold text-sm inline-flex items-center gap-2 bg-white border border-line text-ink px-4 py-2.5 rounded-pill cursor-pointer hover:bg-canvas-alt transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 5h18M6 12h12M10 19h4" stroke="#33401C" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
              {filtersOpen ? 'Hide filters' : 'Filters'}
            </button>
            <span className="text-muted text-sm font-lining">{filtered.length} plants</span>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="font-fraunces text-[13px] text-marigold-deep underline cursor-pointer bg-transparent border-none"
              >
                Clear all
              </button>
            )}
          </div>
          <label className="inline-flex items-center gap-2 text-muted text-sm">
            Sort
            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortKey)}
              className="font-fraunces text-sm text-ink bg-white border border-line rounded-pill px-3.5 py-2 cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A-Z</option>
            </select>
          </label>
        </section>

        {/* body */}
        <section className="max-w-[1280px] mx-auto px-[5vw] pt-6 pb-16 flex gap-8 items-start">

          {/* filter sidebar */}
          {filtersOpen && (
            <aside
              className="flex-shrink-0 bg-white border border-line rounded-lg p-5 shadow-warm"
              style={{ width: '236px', position: 'sticky', top: '88px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-wonderia text-[22px] text-olive-deep">Filters</span>
                <button
                  onClick={clearAll}
                  className="font-fraunces text-[13px] bg-none border-none text-marigold-deep cursor-pointer underline"
                >
                  Clear
                </button>
              </div>

              <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[11px] text-muted mt-4 mb-2.5">Plant family</p>
              {allFamilies.map(f => (
                <CheckRow
                  key={f}
                  label={f}
                  count={famCounts[f]}
                  active={selFamilies.includes(f)}
                  onToggle={() => toggleFamily(f)}
                />
              ))}

              <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[11px] text-muted mt-5 mb-2.5">Setting</p>
              <div className="flex gap-2 flex-wrap">
                {ENV_OPTS.map(v => (
                  <PillBtn key={v} label={v} active={selEnv.includes(v)} onToggle={() => toggleEnv(v)} />
                ))}
              </div>

              <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[11px] text-muted mt-5 mb-2.5">Size</p>
              <div className="flex gap-2 flex-wrap">
                {SIZE_OPTS.map(v => (
                  <PillBtn key={v} label={v} active={selSize.includes(v)} onToggle={() => toggleSize(v)} />
                ))}
              </div>

              <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[11px] text-muted mt-5 mb-2">Max price</p>
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={50}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-ink font-lining mt-1">Up to {formatEGP(maxPrice)} EGP</div>
            </aside>
          )}

          {/* grid */}
          <div className="flex-1 min-w-0">
            {filtered.length > 0 ? (
              <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-muted">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3.5">
                  <path d="M12 21V9M12 9C12 5 9 3 5 3c0 4 3 6 7 6Zm0 0c0-4 3-6 7-6 0 4-3 6-7 6Z" stroke="#84994F" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                <p className="font-wonderia text-[26px] text-olive-deep m-0 mb-1.5">No plants here yet</p>
                <p className="m-0 mb-4">Check back soon, or browse the full collection.</p>
                <button
                  onClick={clearAll}
                  className="font-fraunces font-semibold text-sm border-[1.5px] border-marigold bg-transparent text-marigold-deep px-5 py-2.5 rounded-pill cursor-pointer hover:bg-marigold hover:text-olive-deep transition-colors"
                >
                  See all plants
                </button>
              </div>
            )}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
