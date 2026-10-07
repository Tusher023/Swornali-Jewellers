import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Header, Footer } from '../components/site-shell';
import { StoreProvider } from '../components/store-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Swornali Jewellers | Timeless Elegance in Gold & Diamonds',
  description:
    'Premium handcrafted gold, diamond, and gemstone jewellery from Dhaka, Bangladesh. Explore rings, necklaces, earrings, bracelets and custom pieces — free insured delivery.',
  keywords:
    'jewellery, gold, diamond, Bangladesh, Dhaka, rings, necklaces, earrings, bracelets, wedding, engagement',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider>
          <StoreProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}