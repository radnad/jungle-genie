'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';

const INDOOR_LINKS = [
  { label: 'Large statement plants', href: '/shop?subcategory=Large' },
  { label: 'Rare & collectible', href: '/shop?subcategory=Rare' },
  { label: 'Hanging & trailing', href: '/shop?tag=hanging' },
  { label: 'Low-light friendly', href: '/shop?tag=low-light' },
  { label: 'Air-purifying', href: '/shop?tag=air-purifying' },
];

const FAMILIES = [
  'Monstera', 'Philodendron', 'Alocasia', 'Calathea',
  'Syngonium', 'Anthurium', 'Aglaonema', 'Begonia',
];

export default function SiteHeader() {
  const { itemCount } = useCart();
  const { ids } = useWishlist();
  const [mega, setMega] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 880);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 font-fraunces"
      style={{ background: 'rgba(251,247,234,.92)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #E7DFC8' }}
    >
      <div
        className="max-w-[1280px] mx-auto px-[5vw] flex items-center justify-between gap-5"
        style={{ height: '72px' }}
      >
        {/* wordmark */}
        <Link href="/" className="flex items-center gap-2.5 no-underline flex-shrink-0">
          <Logo size={30} />
          <span className="font-wonderia text-[25px] text-olive-deep leading-none">Jungle Genie</span>
        </Link>

        {/* desktop nav */}
        {!isMobile && (
          <nav className="flex items-center gap-1">
            {/* Indoor dropdown */}
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

            {/* Plant Families dropdown */}
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

            <Link
              href="/#wishes"
              className="font-fraunces font-semibold text-[15px] text-marigold-deep no-underline px-3.5 py-2.5 rounded-pill flex items-center gap-1.5 hover:bg-canvas-alt transition-colors"
            >
              ✦ Bundles
            </Link>
            <Link
              href="/shop?category=Outdoor"
              className="font-fraunces font-medium text-[15px] text-ink no-underline px-3.5 py-2.5 hover:bg-canvas-alt rounded-pill transition-colors"
            >
              Outdoor
            </Link>
            <Link
              href="/shop?tag=pots"
              className="font-fraunces font-medium text-[15px] text-ink no-underline px-3.5 py-2.5 hover:bg-canvas-alt rounded-pill transition-colors"
            >
              Pots
            </Link>
          </nav>
        )}

        {/* actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            aria-label="Search"
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

      {/* mobile drawer */}
      {isMobile && menuOpen && (
        <div className="border-t border-line bg-cream px-[5vw] py-3.5 pb-5">
          {[
            { label: 'Indoor', href: '/shop' },
            { label: 'Plant Families', href: '/shop' },
            { label: '✦ Bundles', href: '/#wishes', gold: true },
            { label: 'Outdoor', href: '/shop?category=Outdoor' },
            { label: 'Pots', href: '/shop?tag=pots' },
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
