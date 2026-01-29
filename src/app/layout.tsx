import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
  'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Le Jeu du Haka',
  description: 'Transforme ton énergie négative en énergie positive !',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/jeu-du-haka-logo-200x200.png', sizes: '200x200', type: 'image/png' },
      { url: '/icons/jeuduhaka-app-icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/icons/jeuduhaka-app-icon-512x512.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Jeu du Haka',
  },
  openGraph: {
    title: 'Le Jeu du Haka',
    description: 'Transforme ton énergie négative en énergie positive !',
    images: [
      {
        url: '/icons/jeuduhaka-app-icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Le Jeu du Haka',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Jeu du Haka',
    description: 'Transforme ton énergie négative en énergie positive !',
    images: ['/icons/jeuduhaka-app-icon-512x512.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <main className="min-h-screen max-w-md mx-auto relative overflow-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
