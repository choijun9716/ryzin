import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RYZIN 라이브 관제 센터',
  description: 'RYZIN Realtime Live Control Center',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#f8fafc] text-[#0f172a]">{children}</body>
    </html>
  );
}
