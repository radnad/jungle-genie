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
const MIN_PRICE = 90;

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

const CHIP_FAMILIES = ['Monstera', 'Philodendron', 'Alocasia', 'Anthurium', 'Ficus', 'Pothos'];
const SIZE_OPTS = ['Small', 'Medium', 'Large'];
const ENV_OPTS = ['Indoor', 'Outdoor'];

// Friendly titles per department, with a fallback.
const DEPT_TITLES: Record<string, string> = {
  Plants: 'The whole jungle',
  Succulents: 'Sweet little succulents',
  Decorations: 'Deck out your space',
  Supplies: 'Everything they need',
  Arrangements: 'Made to gift',
};

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

function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 font-fraunces font-semibold text-[12px] px-3 py-1 rounded-pill"
      style={{ background: '#84994F', color: '#FBF7EA' }}
    >
      {label}
      <button onClick={onRemove} className="hover:opacity-70 transition-opacity leading-none" aria-label="Remove filter">
        x
      </button>
    </span>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sort, setSort] = useState<SortKey>('featured');
  const [selFamilies, setSelFamilies] = useState<string[]>([]);
  const [selDepartment, setSelDepartment] = useState<string>('');
  const [selSubcategory, setSelSubcategory] = useState<string>('');
  const [selTag, setSelTag] = useState<string>('');
  const [selSize, setSelSize] = useState<string[]>([]);
  const [selEnv, setSelEnv] = useState<string[]>([]);
  const [selStock, setSelStock] = useState<'' | 'in' | 'out'>('');
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Sync filter state from the URL (runs on mount and whenever a nav link changes it).
  useEffect(() => {
    const familyParam = searchParams.get('family');
    setSelFamilies(familyParam ? familyParam.split(',').filter(Boolean) : []);
    setSelDepartment(searchParams.get('department') || '');
    setSelEnv(searchParams.get('category') ? [searchParams.get('category')!] : []);
    setSelSubcategory(searchParams.get('subcategory') || '');
    setSelTag(searchParams.get('tag') || '');
    const stock = searchParams.get('stock');
    setSelStock(stock === 'in' || stock === 'out' ? stock : '');
  }, [searchParams]);

  // Build and push a URL from the current filter state (keeps filters shareable).
  const pushUrl = (next: {
    families?: string[]; department?: string; env?: string[];
    subcategory?: string; tag?: string; stock?: '' | 'in' | 'out';
  }) => {
    const families = next.families ?? selFamilies;
    const department = next.department ?? selDepartment;
    const env = next.env ?? selEnv;
    const subcategory = next.subcategory ?? selSubcategory;
    const tag = next.tag ?? selTag;
    const stock = next.stock ?? selStock;
    const p = new URLSearchParams();
    if (department) p.set('department', department);
    if (families.length) p.set('family', families.join(','));
    if (env.length === 1) p.set('category', env[0]);
    if (subcategory) p.set('subcategory', subcategory);
    if (tag) p.set('tag', tag);
    if (stock) p.set('stock', stock);
    const qs = p.toString();
    router.replace(qs ? `/shop?${qs}` : '/shop', { scroll: false });
  };

  const toggleFamily = (fam: string) => {
    const nextFamilies = selFamilies.includes(fam) ? selFamilies.filter(f => f !== fam) : [...selFamilies, fam];
    setSelFamilies(nextFamilies);
    setSelSubcategory('');
    setSelTag('');
    pushUrl({ families: nextFamilies, subcategory: '', tag: '' });
  };

  const toggleEnv = (env: string) => {
    const next = selEnv.includes(env) ? selEnv.filter(e => e !== env) : [...selEnv, env];
    setSelEnv(next);
    pushUrl({ env: next });
  };

  const toggleSize = (size: string) => {
    setSelSize(prev => (prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]));
  };

  const setStock = (val: '' | 'in' | 'out') => {
    const next = selStock === val ? '' : val;
    setSelStock(next);
    pushUrl({ stock: next });
  };

  const clearAll = () => {
    setSelFamilies([]);
    setSelDepartment('');
    setSelSubcategory('');
    setSelTag('');
    setSelSize([]);
    setSelEnv([]);
    setSelStock('');
    setMaxPrice(MAX_PRICE);
    router.replace('/shop', { scroll: false });
  };

  // Families shown in the sidebar depend on the active department so the list stays relevant.
  const familiesInScope = useMemo(() => {
    const scope = selDepartment
      ? products.filter(p => p.department === selDepartment)
      : products.filter(p => p.department === 'Plants' || p.department === 'Succulents');
    return [...new Set(scope.map(p => p.family))].sort();
  }, [selDepartment]);

  const famCounts = useMemo(() => {
    const c: Record<string, number> = {};
    products.forEach(p => {
      c[p.family] = (c[p.family] || 0) + 1;
    });
    return c;
  }, []);

  const familyLabel = selDepartment && selDepartment !== 'Plants' && selDepartment !== 'Succulents' ? 'Type' : 'Plant family';

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      if (selDepartment && p.department !== selDepartment) return false;
      if (selFamilies.length && !selFamilies.includes(p.family)) return false;
      if (selEnv.length && !selEnv.includes(p.category)) return false;
      if (selSubcategory && p.subcategory !== selSubcategory) return false;
      if (selTag && !p.tags.includes(selTag)) return false;
      if (selStock === 'in' && p.inStock === false) return false;
      if (selStock === 'out' && p.inStock !== false) return false;
      if (selSize.length && !selSize.some(s => p.care?.size?.toLowerCase().startsWith(s.toLowerCase()))) return false;
      if (p.priceEGP > maxPrice) return false;
      return true;
    });

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.priceEGP - b.priceEGP);
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.priceEGP - a.priceEGP);
    else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [selDepartment, selFamilies, selEnv, selSubcategory, selTag, selStock, selSize, maxPrice, sort]);

  const hasActiveFilters =
    selFamilies.length > 0 || selDepartment || selEnv.length > 0 || selSubcategory ||
    selTag || selStock || selSize.length > 0 || maxPrice < MAX_PRICE;

  const heading = DEPT_TITLES[selDepartment] || 'The whole jungle';
  const eyebrow = selDepartment || 'All products';
  const showPlantChips = !selDepartment || selDepartment === 'Plants' || selDepartment === 'Succulents';

  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen">

        <section className="max-w-[1280px] mx-auto px-[5vw] pt-10 pb-2">
          <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
            {eyebrow}
          </p>
          <h1 className="font-wonderia font-normal m-0 text-olive-deep" style={{ fontSize: 'clamp(36px,5vw,60px)' }}>
            {heading}
          </h1>

          {/* family chips (plants and succulents only) */}
          {showPlantChips && (
            <div className="flex gap-2.5 flex-wrap mt-5">
              {CHIP_FAMILIES.map(f => (
                <Chip key={f} label={f} active={selFamilies.includes(f)} onToggle={() => toggleFamily(f)} />
              ))}
            </div>
          )}

          {/* active filter tags */}
          {(selDepartment || selSubcategory || selTag || selEnv.length === 1 || selStock) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {selDepartment && <FilterTag label={selDepartment} onRemove={() => { setSelDepartment(''); setSelSubcategory(''); pushUrl({ department: '', subcategory: '' }); }} />}
              {selSubcategory && <FilterTag label={selSubcategory} onRemove={() => { setSelSubcategory(''); pushUrl({ subcategory: '' }); }} />}
              {selTag && <FilterTag label={selTag} onRemove={() => { setSelTag(''); pushUrl({ tag: '' }); }} />}
              {selEnv.length === 1 && <FilterTag label={selEnv[0]} onRemove={() => { setSelEnv([]); pushUrl({ env: [] }); }} />}
              {selStock && <FilterTag label={selStock === 'in' ? 'In stock' : 'Out of stock'} onRemove={() => { setSelStock(''); pushUrl({ stock: '' }); }} />}
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
            <span className="text-muted text-sm font-lining">{filtered.length} items</span>
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
                <button onClick={clearAll} className="font-fraunces text-[13px] bg-none border-none text-marigold-deep cursor-pointer underline">
                  Clear
                </button>
              </div>

              <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[11px] text-muted mt-4 mb-2.5">Availability</p>
              <div className="flex gap-2 flex-wrap">
                <PillBtn label="In stock" active={selStock === 'in'} onToggle={() => setStock('in')} />
                <PillBtn label="Out of stock" active={selStock === 'out'} onToggle={() => setStock('out')} />
              </div>

              <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[11px] text-muted mt-5 mb-2.5">{familyLabel}</p>
              {familiesInScope.map(f => (
                <CheckRow key={f} label={f} count={famCounts[f]} active={selFamilies.includes(f)} onToggle={() => toggleFamily(f)} />
              ))}

              {showPlantChips && (
                <>
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
                </>
              )}

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
                <p className="font-wonderia text-[26px] text-olive-deep m-0 mb-1.5">Nothing here yet</p>
                <p className="m-0 mb-4">Check back soon, or browse the full collection.</p>
                <button
                  onClick={clearAll}
                  className="font-fraunces font-semibold text-sm border-[1.5px] border-marigold bg-transparent text-marigold-deep px-5 py-2.5 rounded-pill cursor-pointer hover:bg-marigold hover:text-olive-deep transition-colors"
                >
                  See everything
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
