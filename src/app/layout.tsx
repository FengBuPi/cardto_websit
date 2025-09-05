import { ThemeProvider } from '@/contexts/theme-context';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Design Platform - 在线协作设计平台',
  description: 'Design Platform 是一款专业的在线协作设计平台，支持团队协作、设计规范管理、资源社区等功能。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="design-platform-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
