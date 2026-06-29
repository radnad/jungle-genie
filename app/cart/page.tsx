'use client';

import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PlantImage from '@/components/PlantImage';
import QtyStepper from '@/components/QtyStepper';
import { useCart } from '@/lib/cart-context';
import { formatEGP } from '@/lib/format';

const FREE_DELIVERY_THRESHOLD = 1000;
const DELIVERY_FEE = 75;

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen font-fraunces">
        <section className="max-w-[1180px] mx-auto px-[5vw] pt-10 pb-2">
          <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
            Your basket
          </p>
          <h1
            className="font-wonderia font-normal m-0 text-olive-deep"
            style={{ fontSize: 'clamp(36px,5vw,58px)' }}
          >
            Granting your wishes
          </h1>
        </section>

        <section className="max-w-[1180px] mx-auto px-[5vw] pt-6 pb-16 flex flex-wrap gap-8 items-start">

          {/* line items */}
          <div style={{ flex: '1 1 460px', minWidth: '300px' }}>
            {items.length > 0 ? (
              <>
                <div className="flex flex-col gap-3.5">
                  {items.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-4 bg-white border border-line rounded-lg p-4 shadow-warm items-center"
                    >
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-canvas-alt">
                        <PlantImage
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          sizes="96px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {item.isBundle ? (
                          <span
                            className="inline-flex items-center gap-1.5 font-fraunces font-semibold text-[10px] tracking-[.06em] text-olive-deep px-2.5 py-1 rounded-pill mb-1.5"
                            style={{ background: '#FCB53B' }}
                          >
                            ✦ 3 WISHES
                          </span>
                        ) : (
                          <span
                            className="inline-block font-fraunces font-semibold text-[11px] px-2.5 py-1 rounded-pill mb-1.5"
                            style={{ background: 'rgba(180,82,83,.12)', color: '#B45253' }}
                          >
                            {item.family}
                          </span>
                        )}
                        <h3 className="font-wonderia font-normal text-[21px] leading-tight m-0 mb-1 text-olive-deep">
                          {item.name}
                        </h3>
                        {item.bundleLabel && (
                          <p className="m-0 text-[13px] text-muted">{item.bundleLabel}</p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                        <span className="font-fraunces font-semibold text-lg text-ink font-lining">
                          {formatEGP(item.priceEGP * item.quantity)} EGP
                        </span>
                        <QtyStepper
                          value={item.quantity}
                          onChange={q => updateQuantity(item.id, q)}
                          size="sm"
                        />
                        <button
                          onClick={() => removeItem(item.id)}
                          className="font-fraunces text-[12px] bg-none border-none text-muted cursor-pointer underline hover:text-rose-clay transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 font-fraunces font-semibold text-[15px] text-olive no-underline mt-5 hover:text-olive-deep transition-colors"
                >
                  Continue shopping
                </Link>
              </>
            ) : (
              <div className="text-center py-[70px] px-5 bg-white border border-line rounded-lg">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="mx-auto mb-3.5">
                  <path d="M6 8h12l-1 11a2 2 0 01-2 1.8H9A2 2 0 017 19L6 8Z" stroke="#84994F" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M9 8a3 3 0 016 0" stroke="#84994F" strokeWidth="1.5" />
                </svg>
                <p className="font-wonderia text-[28px] text-olive-deep m-0 mb-1.5">Your basket is resting</p>
                <p className="m-0 mb-4 text-muted">Make a wish and your jungle will start to grow.</p>
                <Link
                  href="/shop"
                  className="inline-block font-fraunces font-semibold text-[15px] no-underline rounded-pill px-7 py-3 text-cream"
                  style={{ background: '#84994F' }}
                >
                  Browse plants
                </Link>
              </div>
            )}
          </div>

          {/* order summary */}
          <aside
            className="bg-white border border-line rounded-lg p-6 shadow-warm"
            style={{ flex: '0 1 340px', minWidth: '280px', position: 'sticky', top: '88px' }}
          >
            <h2 className="font-wonderia font-normal text-[26px] m-0 mb-4 text-olive-deep">
              Order summary
            </h2>

            <div className="flex justify-between text-[15px] text-muted py-2">
              <span>Subtotal</span>
              <span className="text-ink font-lining">{formatEGP(subtotal)} EGP</span>
            </div>
            <div className="flex justify-between text-[15px] text-muted py-2">
              <span>Delivery</span>
              <span className="font-semibold text-olive">
                {freeDelivery ? 'Free' : `${formatEGP(delivery)} EGP`}
              </span>
            </div>
            {!freeDelivery && subtotal > 0 && (
              <p className="text-[12px] text-muted m-0 pb-1">
                Add {formatEGP(FREE_DELIVERY_THRESHOLD - subtotal)} EGP more for free delivery
              </p>
            )}

            <div className="h-px bg-line my-3" />

            <div className="flex justify-between items-baseline py-1 pb-4">
              <span className="font-fraunces font-semibold text-[17px]">Total</span>
              <span className="font-fraunces font-semibold text-[26px] text-ink font-lining">
                {formatEGP(total)} EGP
              </span>
            </div>

            <Link
              href="/checkout"
              className="block text-center w-full font-fraunces font-semibold text-base rounded-pill cursor-pointer py-4 shadow-warm transition-all duration-150 text-cream no-underline"
              style={{ background: '#84994F' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#33401C')}
              onMouseLeave={e => (e.currentTarget.style.background = '#84994F')}
            >
              Checkout
            </Link>

            <div
              className="flex items-center gap-2.5 mt-4 rounded-md p-3"
              style={{ background: '#FFE797' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <path
                  d="M3 13l2-6h11l3 4h2v5h-2M3 13v3h2m0-3h11m4 0v3h-2m-13 0a2 2 0 104 0m9 0a2 2 0 10-4 0"
                  stroke="#E09A24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-[13px] text-olive-deep leading-snug">
                Delivered across Egypt - carefully boxed with care notes tucked in.
              </span>
            </div>

            <p className="flex items-center justify-center gap-2 text-[13px] text-muted mt-3.5 m-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="10" width="14" height="10" rx="2" stroke="#5A6147" strokeWidth="1.6" />
                <path d="M8 10V7a4 4 0 018 0v3" stroke="#5A6147" strokeWidth="1.6" />
              </svg>
              Secure checkout · prices in EGP
            </p>
          </aside>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
