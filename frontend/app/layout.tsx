import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { Header, Footer } from '../components/site-shell';
import { StoreProvider } from '../components/store-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Swornali Jewellers | স্বর্ণালী জুয়েলার্স - Gold, Hallmark & Silver Jewellery',
  description:
    'Swornali Jewellers (স্বর্ণালী জুয়েলার্স) — Proprietor: Ram Prasad Tarafder. Tasteful modern design Guinea gold and Hallmarked 18K/21K/22K gold & silver jewellery. Mehedi Market, Rajganj Road, Jashore, Bangladesh.',
  keywords:
    'Swornali Jewellers, স্বর্ণালী জুয়েলার্স, Ram Prasad Tarafder, রাম প্রসাদ তরফদার, Jashore, যশোর, Rajganj Road, gold jewellery, 22K gold, 21K gold, 18K gold, guinea gold, hallmark silver, Bangladesh',
  icons: {
    icon: '/Swornali-Jewellers/images/logo.png',
    shortcut: '/Swornali-Jewellers/images/logo.png',
    apple: '/Swornali-Jewellers/images/logo.png',
  },
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