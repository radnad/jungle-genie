'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import site from '@/content/site.json';

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setJoined(true);
      setEmail('');
    }
  };

  return (
    <footer className="font-fraunces">
      {/* instagram strip */}
      <section className="bg-canvas-alt px-[5vw] py-12 text-center">
        <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
          Follow the jungle
        </p>
        <a
          href={site.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="font-wonderia text-[30px] text-olive-deep no-underline hover:text-olive transition-colors"
        >
          {site.instagramHandle}
        </a>
        <div
          className="grid gap-2 max-w-[1100px] mx-auto mt-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
        >
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="w-full rounded-xl bg-line"
              style={{ aspectRatio: '1', background: 'linear-gradient(135deg, #E7DFC8, #F2ECD9)' }}
            />
          ))}
        </div>
      </section>

      {/* main footer */}
      <div className="bg-olive-deep text-cream px-[5vw] pt-[60px] pb-9">
        <div
          className="max-w-[1100px] mx-auto grid gap-10"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', alignItems: 'start' }}
        >
          {/* brand */}
          <div className="max-w-[340px]">
            <div className="flex items-center gap-2.5 mb-3.5">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 4C12 12 12 20 20 36C28 20 28 12 20 4Z"
                  stroke="#FCB53B"
                  strokeWidth="1.8"
                  fill="rgba(252,181,59,.14)"
                />
                <path d="M20 10V32" stroke="#FCB53B" strokeWidth="1.2" />
              </svg>
              <span className="font-wonderia text-2xl">{site.brand}</span>
            </div>
            <p className="text-butter opacity-90 text-[15px] leading-relaxed m-0 mb-3.5">
              Curated plants and "3 Wishes" trios, delivered with care.
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-cream border rounded-pill px-3.5 py-2 m-0"
              style={{ background: 'rgba(252,181,59,.16)', borderColor: 'rgba(252,181,59,.3)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 13l2-6h11l3 4h2v5h-2M3 13v3h2m0-3h11m4 0v3h-2m-13 0a2 2 0 104 0m9 0a2 2 0 10-4 0"
                  stroke="#FCB53B"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {site.delivery}
            </p>
          </div>

          {/* shop links */}
          <div>
            <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[12px] text-marigold m-0 mb-3.5">
              Shop
            </p>
            {[
              { label: 'Indoor plants', href: '/shop' },
              { label: 'Rare & collectible', href: '/shop?subcategory=Rare' },
              { label: '✦ 3 Wishes bundles', href: '/#wishes' },
              { label: 'Pots & planters', href: '/shop?tag=pots' },
            ].map(l => (
              <Link
                key={l.label}
                href={l.href}
                className="block text-cream no-underline text-[15px] py-1 hover:text-butter transition-colors"
                style={{ opacity: 0.85 }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* care links */}
          <div>
            <p className="font-fraunces font-semibold tracking-[.1em] uppercase text-[12px] text-marigold m-0 mb-3.5">
              Care and delivery
            </p>
            {[
              'Plant care guides',
              'Delivery and timing',
              'Healthy-arrival promise',
            ].map(l => (
              <a
                key={l}
                href="#"
                className="block text-cream no-underline text-[15px] py-1 hover:text-butter transition-colors"
                style={{ opacity: 0.85 }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* newsletter */}
          <div className="min-w-[240px]">
            <p className="font-wonderia text-[22px] text-cream m-0 mb-1.5">{site.newsletterHeadline}</p>
            <p className="text-butter text-sm leading-relaxed m-0 mb-3.5" style={{ opacity: 0.85 }}>
              {site.newsletterSubline}
            </p>
            {joined ? (
              <p className="text-marigold font-semibold text-[15px]">Wish received. Watch your inbox.</p>
            ) : (
              <form
                onSubmit={handleJoin}
                className="flex gap-2 rounded-pill px-4 py-1.5"
                style={{ background: 'rgba(251,247,234,.1)', border: '1px solid rgba(251,247,234,.25)' }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={site.newsletterPlaceholder}
                  required
                  className="flex-1 min-w-0 bg-transparent border-none outline-none text-cream font-fraunces text-sm placeholder:opacity-50"
                  style={{ color: '#FBF7EA' }}
                />
                <button
                  type="submit"
                  className="font-fraunces font-semibold text-[13px] border-none rounded-pill cursor-pointer py-2 px-4 text-olive-deep whitespace-nowrap transition-colors"
                  style={{ background: '#FCB53B' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#FCB53B')}
                >
                  {site.newsletterCTA}
                </button>
              </form>
            )}
          </div>
        </div>

        <div
          className="max-w-[1100px] mx-auto mt-9 pt-5 flex flex-wrap gap-2 justify-between text-cream text-[13px]"
          style={{ borderTop: '1px solid rgba(251,247,234,.16)', opacity: 0.7 }}
        >
          <span>© {site.copyright}</span>
          <span>Prices in EGP · {site.instagramHandle}</span>
        </div>
      </div>
    </footer>
  );
}
