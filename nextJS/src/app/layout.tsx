import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Contentful AI Page Generator',
  description: 'Professional web application for AI-powered content generation and Contentful CMS publishing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className="min-h-screen bg-cursor-bg">{children}</body>
    </html>
  );
}

