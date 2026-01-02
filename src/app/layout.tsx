import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import '../styles/globals.css';
import { Header } from '@/components/Header';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

const interTight = Inter({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'Mundo pet',
  description:
    'Aqui você vê todos os seus serviços e clientes agendados para hoje.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${interTight.variable} antialiased`}>
        <Header />
        <div className="max-w-3xl mx-auto">
          <main className="flex flex-1 flex-col mt-12">
            {children}
            <Toaster position="bottom-center" />
          </main>
        </div>
      </body>
    </html>
  );
}
