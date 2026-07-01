'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';
import InstagramIcon from './InstagramIcon';
import PlantImage from './PlantImage';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import productsData from '@/content/products.json';
import site from '@/content/site.json';
import { formatEGP } from '@/lib/format';
import type { Product } from '@/lib/types';

const products = productsData as unknown as Product[];

// Indoor "by need" links. Each only appears in the menu if at least one
// product matches it, so we never link to a dead, empty page.
const ALL_INDOOR_LINKS = [
  { label: 'Large statement plants', href: '/shop?subcategory=Large', match: (p: Product) => p.subcategory === 'Large' },
  { label: 'Rare & collectible', href: '/shop?subcategory=Rare', match: (p: Product) => p.subcategory === 'Rare' },
  { label: 'Hanging & trailing', href: '/shop?tag=hanging', match: (p: Product) => p.tags.includes('hanging') },
  { label: 'Low-light friendly', href: '/shop?tag=low-light', match: (p: Product) => p.tags.includes('low-light') },
  { label: 'Air-purifying', href: '/shop?tag=air-purifying', match: (p: Product) => p.tags.includes('air-purifying') },
];
const INDOOR_LINKS = ALL_INDOOR_LINKS.filter(l => products.some(l.match));

// Curated plant families, shown in the chosen order. A family only appears
// if it currently has products, so empty families auto-hide from the menu.
const CURATED_FAMILIES = [
  'Monstera', 'Philodendron', 'Alocasia', 'Calathea',
  'Syngonium', 'Anthurium', 'Aglaonema', 'Begonia',
];
const FAMILIES = CURATED_FAMILIES.filter(f => products.some(p => p.family === f));

// Top-level category links also auto-hide when they have no products.
const HAS_OUTDOOR = products.some(p => p.category === 'Outdoor');
const HAS_POTS = products.some(p => p.tags.includes('pots'));

export default function SiteHeader() {
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const [mega, setMega] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 880);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Focus the search box when it opens, and close it on Escape.
  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setQuery('');
  };

  // Case-insensitive, partial-match search over name, family, category,
  // subcategory, and tags. Empty query shows nothing.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.family.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.subcategory ?? '').toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query]);

  return (
    <header
      className="sticky top-0 z-50 font-fraunces"
      style={{ background: 'rgba(251,247,234,.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E7DFC8' }}
    >
      <div
        className="max-w-[1280px] mx-auto px-[5vw] flex items-center justify-between gap-5"
        style={{ height: '72px' }}
      >
        {/* wordmark. The logo links to the homepage. Instagram lives only in
            its own "Follow us on Instagram" spots (the header IG icon, the
            footer, and the homepage strip), never on the logo. */}
        <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <BrandLogo height={40} className="rounded-md" />
          <span className="font-wonderia text-[25px] text-olive-deep leading-none">Jungle Genie</span>
        </Link>

        {/* desktop nav */}
        {!isMobile && (
          <nav className="flex items-center gap-1">
            {/* Indoor dropdown */}
            {INDOOR_LINKS.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setMega('indoor')}
              onMouseLeave={() => setMega(null)}
            >
              <Link
                href="/shop"
                className="font-fraunces font-medium text-[15px] text-ink no-underline px-3.5 py-2.5 rounded-pill flex items-center gap-1.5 hover:bg-canvas-alt transition-colors"
              >
                Indoor <span className="text-[9px] text-muted">▾</span>
              </Link>
              {mega === 'indoor' && (
                <div
                  className="absolute top-[46px] left-0 bg-white border border-line rounded-md p-3.5"
                  style={{ boxShadow: '0 14px 36px rgba(51,64,28,.16)', minWidth: '210px' }}
                >
                  <p className="font-fraunces font-semibold tracking-[.12em] uppercase text-[10px] text-marigold-deep mx-2 mb-2.5 mt-0.5">
                    By need
                  </p>
                  {INDOOR_LINKS.map(l => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="block px-2.5 py-2 rounded-sm no-underline text-ink text-sm hover:bg-canvas-alt transition-colors"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* Plant Families dropdown */}
            {FAMILIES.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setMega('families')}
              onMouseLeave={() => setMega(null)}
            >
              <Link
                href="/shop"
                className="font-fraunces font-medium text-[15px] text-ink no-underline px-3.5 py-2.5 rounded-pill flex items-center gap-1.5 hover:bg-canvas-alt transition-colors"
              >
                Plant Families <span className="text-[9px] text-muted">▾</span>
              </Link>
              {mega === 'families' && (
                <div
                  className="absolute top-[46px] left-0 bg-white border border-line rounded-md p-3.5"
                  style={{
                    boxShadow: '0 14px 36px rgba(51,64,28,.16)',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2px 18px',
                    minWidth: '300px',
                  }}
                >
                  {FAMILIES.map(f => (
                    <Link
                      key={f}
                      href={`/shop?family=${f}`}
                      className="block px-2.5 py-2 rounded-sm no-underline text-ink text-sm hover:bg-canvas-alt transition-colors"
                    >
                      {f}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            )}

            <Link
              href="/#wishes"
              className="font-fraunces font-semibold text-[15px] text-marigold-deep no-underline px-3.5 py-2.5 rounded-pill flex items-center gap-1.5 hover:bg-canvas-alt transition-colors"
            >
              ✦ Bundles
            </Link>
            {HAS_OUTDOOR && (
              <Link
                href="/shop?category=Outdoor"
                className="font-fraunces font-medium text-[15px] text-ink no-underline px-3.5 py-2.5 hover:bg-canvas-alt rounded-pill transition-colors"
              >
                Outdoor
              </Link>
            )}
            {HAS_POTS && (
              <Link
                href="/shop?tag=pots"
                className="font-fraunces font-medium text-[15px] text-ink no-underline px-3.5 py-2.5 hover:bg-canvas-alt rounded-pill transition-colors"
              >
                Pots
              </Link>
            )}
          </nav>
        )}

        {/* actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="w-[42px] h-[42px] rounded-full cursor-pointer flex items-center justify-center hover:bg-canvas-alt transition-colors no-underline"
          >
            <InstagramIcon size={20} color="#33401C" />
          </a>
          <button
            aria-label={searchOpen ? 'Close search' : 'Search'}
            aria-expanded={searchOpen}
            onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
            className="w-[42px] h-[42px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center hover:bg-canvas-alt transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#33401C" strokeWidth="1.7" />
              <path d="M16.5 16.5L21 21" stroke="#33401C" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>

          <button
            aria-label="Wishlist"
            className="relative w-[42px] h-[42px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center hover:bg-canvas-alt transition-colors"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 20s-6.5-4.6-9-8.6C1.5 9 2.7 6.3 5.5 6.3c1.8 0 2.9 1 3.6 2 .7-1 1.8-2 3.6-2 2.8 0 4 2.7 2.5 5.1C18.5 15.4 12 20 12 20Z"
                stroke="#B45253"
                strokeWidth="1.6"
                strokeLinejoin="round"
                fill={ids.length > 0 ? '#B45253' : 'none'}
              />
            </svg>
          </button>

          <Link
            href="/cart"
            aria-label="Cart"
            className="relative w-[42px] h-[42px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center hover:bg-canvas-alt transition-colors no-underline"
          >
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 8h12l-1 11a2 2 0 01-2 1.8H9A2 2 0 017 19L6 8Z"
                stroke="#33401C"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M9 8a3 3 0 016 0" stroke="#33401C" strokeWidth="1.6" />
            </svg>
            {itemCount > 0 && (
              <span
                className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 font-fraunces font-semibold text-[11px] rounded-pill flex items-center justify-center font-lining text-olive-deep"
                style={{ background: '#FCB53B' }}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {isMobile && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Menu"
              className="w-[42px] h-[42px] border-none bg-transparent rounded-full cursor-pointer flex items-center justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d={menuOpen ? 'M18 6L6 18M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
                  stroke="#33401C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* search overlay - works from every page since the header is global */}
      {searchOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(44,48,25,.28)' }}
            onClick={closeSearch}
            aria-hidden="true"
          />
          <div
            className="absolute left-0 right-0 top-full z-50 bg-cream border-t border-line"
            style={{ boxShadow: '0 16px 40px rgba(51,64,28,.18)' }}
          >
            <div className="max-w-[1280px] mx-auto px-[5vw] py-4">
              <div className="flex items-center gap-2.5 bg-white border border-line rounded-pill px-4 py-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                  <circle cx="11" cy="11" r="7" stroke="#5A6147" strokeWidth="1.7" />
                  <path d="M16.5 16.5L21 21" stroke="#5A6147" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                <input
                  ref={searchInputRef}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search plants by name, family, or type"
                  className="flex-1 min-w-0 bg-transparent border-none outline-none font-fraunces text-[15px] text-ink placeholder:text-muted"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); searchInputRef.current?.focus(); }}
                    aria-label="Clear search"
                    className="flex-shrink-0 text-muted hover:text-rose-clay text-[18px] leading-none bg-transparent border-none cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              {query.trim() && (
                results.length > 0 ? (
                  <div className="mt-3 flex flex-col gap-1">
                    {results.map(p => (
                      <Link
                        key={p.id}
                        href={`/shop/${p.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-3 p-2 rounded-md no-underline hover:bg-canvas-alt transition-colors"
                      >
                        <div className="relative w-11 h-11 flex-shrink-0 rounded-md overflow-hidden bg-canvas-alt">
                          <PlantImage src={p.imageUrl} alt={p.name} fill sizes="44px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-wonderia text-[17px] text-olive-deep leading-tight truncate">{p.name}</div>
                          <div className="text-[12px] text-muted truncate">{p.family} · {p.category}</div>
                        </div>
                        <div className="font-fraunces font-semibold text-[14px] text-ink font-lining flex-shrink-0">
                          {formatEGP(p.salePriceEGP ?? p.priceEGP)} EGP
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 mb-1 text-center text-muted text-[15px]">
                    No plants match that wish. Try another name.
                  </p>
                )
              )}
            </div>
          </div>
        </>
      )}

      {/* mobile drawer */}
      {isMobile && menuOpen && (
        <div className="border-t border-line bg-cream px-[5vw] py-3.5 pb-5">
          {[
            { label: 'Indoor', href: '/shop' },
            { label: 'Plant Families', href: '/shop' },
            { label: '✦ Bundles', href: '/#wishes', gold: true },
            ...(HAS_OUTDOOR ? [{ label: 'Outdoor', href: '/shop?category=Outdoor' }] : []),
            ...(HAS_POTS ? [{ label: 'Pots', href: '/shop?tag=pots' }] : []),
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block font-wonderia text-[22px] no-underline py-2.5"
              style={{ color: l.gold ? '#E09A24' : '#33401C' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
