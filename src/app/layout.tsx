// src/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Discover Our Products',
  description: 'Browse the latest curated products.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
