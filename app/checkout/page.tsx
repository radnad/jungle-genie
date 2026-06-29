'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { useCart } from '@/lib/cart-context';
import { formatEGP } from '@/lib/format';
import site from '@/content/site.json';

const DELIVERY_FEE = site.orders.deliveryFeeEGP;
const FREE_DELIVERY_THRESHOLD = site.orders.freeDeliveryThresholdEGP;

// Egyptian governorates for the delivery dropdown.
const GOVERNORATES = [
  'Cairo', 'Giza', 'Alexandria', 'Qalyubia', 'Dakahlia', 'Sharqia',
  'Gharbia', 'Monufia', 'Beheira', 'Kafr El Sheikh', 'Damietta',
  'Port Said', 'Ismailia', 'Suez', 'North Coast', 'Fayoum', 'Beni Suef',
  'Minya', 'Assiut', 'Sohag', 'Qena', 'Luxor', 'Aswan', 'Red Sea',
  'Matrouh', 'New Valley', 'North Sinai', 'South Sinai',
];

interface Fields {
  name: string;
  phone: string;
  address: string;
  governorate: string;
  notes: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

  const [fields, setFields] = useState<Fields>({
    name: '', phone: '', address: '', governorate: '', notes: '',
  });
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [placed, setPlaced] = useState<null | {
    ref: string;
    orderText: string;
    total: number;
  }>(null);

  const freeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const delivery = freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + delivery;

  const set = (k: keyof Fields, v: string) => {
    setFields(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = 'Please add your name';
    const digits = fields.phone.replace(/\D/g, '');
    if (digits.length < 8) e.phone = 'Please add a valid phone number';
    if (!fields.address.trim()) e.address = 'Please add your address';
    if (!fields.governorate) e.governorate = 'Please choose your governorate';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildOrderText = (ref: string): string => {
    const lines = items.map(
      i => `- ${i.quantity}x ${i.name} (${formatEGP(i.priceEGP)} EGP each) = ${formatEGP(i.priceEGP * i.quantity)} EGP`,
    );
    return [
      `New Jungle Genie order ${ref}`,
      '',
      `Name: ${fields.name}`,
      `Phone: ${fields.phone}`,
      `Governorate: ${fields.governorate}`,
      `Address: ${fields.address}`,
      fields.notes.trim() ? `Notes: ${fields.notes}` : 'Notes: none',
      '',
      'Items:',
      ...lines,
      '',
      `Subtotal: ${formatEGP(subtotal)} EGP`,
      `Delivery: ${freeDelivery ? 'Free' : `${formatEGP(delivery)} EGP`}`,
      `Total: ${formatEGP(total)} EGP`,
      '',
      'Payment: Cash on Delivery',
    ].join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const ref = 'JG-' + Date.now().toString(36).toUpperCase().slice(-6);
    const orderText = buildOrderText(ref);

    // Keep a local copy of the order on the customer's device as a backup.
    try {
      const prev = JSON.parse(localStorage.getItem('jg-orders') || '[]');
      prev.push({ ref, at: new Date().toISOString(), fields, items, total });
      localStorage.setItem('jg-orders', JSON.stringify(prev));
    } catch {}

    // Hand the order to the shop owner over WhatsApp.
    const waUrl = `https://wa.me/${site.orders.whatsappNumber}?text=${encodeURIComponent(orderText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setPlaced({ ref, orderText, total });
    clearCart();
    window.scrollTo({ top: 0 });
  };

  // confirmation screen
  if (placed) {
    const mailto = `mailto:${site.orders.orderEmail}?subject=${encodeURIComponent(
      `New Jungle Genie order ${placed.ref}`,
    )}&body=${encodeURIComponent(placed.orderText)}`;
    const waUrl = `https://wa.me/${site.orders.whatsappNumber}?text=${encodeURIComponent(placed.orderText)}`;
    return (
      <>
        <SiteHeader />
        <main className="bg-cream min-h-screen font-fraunces">
          <section className="max-w-[640px] mx-auto px-[5vw] py-16 text-center">
            <div
              className="mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: '#84994F' }}
            >
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4 10-11" stroke="#FBF7EA" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="font-wonderia font-normal text-olive-deep m-0 mb-3" style={{ fontSize: 'clamp(34px,5vw,52px)' }}>
              Wish granted, your order is on its way
            </h1>
            <p className="text-muted text-[17px] leading-relaxed m-0 mb-2">
              Thank you, {fields.name.split(' ')[0]}. Your order reference is{' '}
              <strong className="text-olive-deep">{placed.ref}</strong>.
            </p>
            <p className="text-muted text-[15px] leading-relaxed m-0 mb-7">
              A WhatsApp message with your order just opened so you can send it to us. We will confirm your
              delivery and you pay cash when your plants arrive.
            </p>

            <div className="bg-white border border-line rounded-lg shadow-warm p-6 text-left mb-7">
              <p className="font-wonderia text-[22px] text-olive-deep m-0 mb-3">Order summary</p>
              <pre className="whitespace-pre-wrap font-fraunces text-[14px] text-ink m-0 leading-relaxed">
{placed.orderText}
              </pre>
            </div>

            <p className="text-[14px] text-muted m-0 mb-3">
              If WhatsApp did not open, use a button below to send your order.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-fraunces font-semibold text-[15px] no-underline rounded-pill px-6 py-3 text-cream"
                style={{ background: '#84994F' }}
              >
                Send on WhatsApp
              </a>
              <a
                href={mailto}
                className="font-fraunces font-semibold text-[15px] no-underline rounded-pill px-6 py-3 border-[1.5px] border-olive text-olive-deep bg-transparent"
              >
                Email the order instead
              </a>
            </div>

            <div className="mt-9">
              <Link
                href="/shop"
                className="font-fraunces font-semibold text-[15px] text-olive no-underline"
                style={{ borderBottom: '1.5px solid #FCB53B' }}
              >
                Continue shopping
              </Link>
            </div>
          </section>
          <SiteFooter />
        </main>
      </>
    );
  }

  // empty cart guard
  if (items.length === 0) {
    return (
      <>
        <SiteHeader />
        <main className="bg-cream min-h-screen font-fraunces">
          <section className="max-w-[640px] mx-auto px-[5vw] py-20 text-center">
            <h1 className="font-wonderia text-[34px] text-olive-deep m-0 mb-2">Your basket is empty</h1>
            <p className="text-muted m-0 mb-5">Add a plant or two, then come back to check out.</p>
            <Link
              href="/shop"
              className="inline-block font-fraunces font-semibold text-[15px] no-underline rounded-pill px-7 py-3 text-cream"
              style={{ background: '#84994F' }}
            >
              Browse plants
            </Link>
          </section>
          <SiteFooter />
        </main>
      </>
    );
  }

  const inputCls =
    'w-full font-fraunces text-[15px] text-ink bg-white border rounded-md px-3.5 py-3 outline-none focus:border-olive transition-colors';

  return (
    <>
      <SiteHeader />
      <main className="bg-cream min-h-screen font-fraunces">
        <section className="max-w-[1180px] mx-auto px-[5vw] pt-10 pb-2">
          <p className="font-fraunces font-semibold tracking-[.16em] uppercase text-[12px] text-marigold-deep m-0 mb-1.5">
            Checkout
          </p>
          <h1 className="font-wonderia font-normal m-0 text-olive-deep" style={{ fontSize: 'clamp(34px,5vw,56px)' }}>
            Almost there
          </h1>
        </section>

        <form
          onSubmit={handleSubmit}
          className="max-w-[1180px] mx-auto px-[5vw] pt-6 pb-16 flex flex-wrap gap-8 items-start"
        >
          {/* delivery details */}
          <div style={{ flex: '1 1 460px', minWidth: '300px' }}>
            <div className="bg-white border border-line rounded-lg shadow-warm p-6">
              <h2 className="font-wonderia text-[24px] text-olive-deep m-0 mb-1">Delivery details</h2>
              <p className="text-muted text-[14px] m-0 mb-5">
                We only ask for what we need to deliver your plants.
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-olive-deep mb-1.5">Full name</label>
                  <input
                    className={inputCls}
                    style={{ borderColor: errors.name ? '#B45253' : '#E7DFC8' }}
                    value={fields.name}
                    onChange={e => set('name', e.target.value)}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-rose-clay text-[12px] m-0 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-olive-deep mb-1.5">Phone number</label>
                  <input
                    className={inputCls}
                    style={{ borderColor: errors.phone ? '#B45253' : '#E7DFC8' }}
                    value={fields.phone}
                    onChange={e => set('phone', e.target.value)}
                    placeholder="01x xxxx xxxx"
                    inputMode="tel"
                  />
                  {errors.phone && <p className="text-rose-clay text-[12px] m-0 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-olive-deep mb-1.5">Governorate</label>
                  <select
                    className={inputCls}
                    style={{ borderColor: errors.governorate ? '#B45253' : '#E7DFC8', cursor: 'pointer' }}
                    value={fields.governorate}
                    onChange={e => set('governorate', e.target.value)}
                  >
                    <option value="">Choose your governorate</option>
                    {GOVERNORATES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {errors.governorate && <p className="text-rose-clay text-[12px] m-0 mt-1">{errors.governorate}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-olive-deep mb-1.5">Address</label>
                  <textarea
                    className={inputCls}
                    style={{ borderColor: errors.address ? '#B45253' : '#E7DFC8', resize: 'vertical', minHeight: '76px' }}
                    value={fields.address}
                    onChange={e => set('address', e.target.value)}
                    placeholder="Street, building, floor, apartment, and any landmark"
                  />
                  {errors.address && <p className="text-rose-clay text-[12px] m-0 mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-semibold text-olive-deep mb-1.5">
                    Notes <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <textarea
                    className={inputCls}
                    style={{ borderColor: '#E7DFC8', resize: 'vertical', minHeight: '60px' }}
                    value={fields.notes}
                    onChange={e => set('notes', e.target.value)}
                    placeholder="A preferred delivery time, gift message, anything else"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* order summary */}
          <aside
            className="bg-white border border-line rounded-lg p-6 shadow-warm"
            style={{ flex: '0 1 360px', minWidth: '280px', position: 'sticky', top: '88px' }}
          >
            <h2 className="font-wonderia font-normal text-[26px] m-0 mb-4 text-olive-deep">Your order</h2>

            <div className="flex flex-col gap-2.5 mb-4">
              {items.map(i => (
                <div key={i.id} className="flex justify-between gap-3 text-[14px]">
                  <span className="text-ink">
                    {i.quantity}x {i.name}
                  </span>
                  <span className="text-ink font-lining whitespace-nowrap">
                    {formatEGP(i.priceEGP * i.quantity)} EGP
                  </span>
                </div>
              ))}
            </div>

            <div className="h-px bg-line my-3" />

            <div className="flex justify-between text-[15px] text-muted py-1">
              <span>Subtotal</span>
              <span className="text-ink font-lining">{formatEGP(subtotal)} EGP</span>
            </div>
            <div className="flex justify-between text-[15px] text-muted py-1">
              <span>Delivery</span>
              <span className="font-semibold text-olive">
                {freeDelivery ? 'Free' : `${formatEGP(delivery)} EGP`}
              </span>
            </div>

            <div className="h-px bg-line my-3" />

            <div className="flex justify-between items-baseline py-1 pb-4">
              <span className="font-fraunces font-semibold text-[17px]">Total</span>
              <span className="font-fraunces font-semibold text-[26px] text-ink font-lining">
                {formatEGP(total)} EGP
              </span>
            </div>

            <div
              className="flex items-center gap-2.5 mb-4 rounded-md p-3"
              style={{ background: '#FFE797' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <path d="M3 13l2-6h11l3 4h2v5h-2M3 13v3h2m0-3h11m4 0v3h-2m-13 0a2 2 0 104 0m9 0a2 2 0 10-4 0"
                  stroke="#E09A24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px] text-olive-deep leading-snug">
                Cash on Delivery. Pay when your plants arrive, delivered across Egypt.
              </span>
            </div>

            <button
              type="submit"
              className="w-full font-fraunces font-semibold text-base border-none rounded-pill cursor-pointer py-4 shadow-warm transition-all duration-150 text-cream"
              style={{ background: '#84994F' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#33401C')}
              onMouseLeave={e => (e.currentTarget.style.background = '#84994F')}
            >
              Place order
            </button>

            <p className="text-[12px] text-muted text-center mt-3 m-0">
              No payment now, no account needed. Prices in EGP.
            </p>
          </aside>
        </form>

        <SiteFooter />
      </main>
    </>
  );
}
