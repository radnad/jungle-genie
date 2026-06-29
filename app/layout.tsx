import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: 'Jungle Genie - Nurturing Nature',
  description:
    'Rare leaves, easy companions and curated 3 Wishes trios - chosen with care and delivered across Egypt.',
  keywords: 'plants, indoor plants, rare plants, Egypt, plant shop',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className="font-fraunces bg-cream text-ink">
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
