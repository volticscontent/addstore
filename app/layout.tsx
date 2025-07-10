import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* PIXEL MÉXICO PANICAS */}
        <script dangerouslySetInnerHTML={{__html:`window.pixelId = "686e1b79eef94a454b310604";var a=document.createElement('script');a.setAttribute('async','');a.setAttribute('defer','');a.setAttribute('src','https://cdn.utmify.com.br/scripts/pixel/pixel.js');document.head.appendChild(a);`}} />
        {/* PIXEL MÉXICO KEVS */}
        <script dangerouslySetInnerHTML={{__html:`window.pixelId = "686e1c5ab8b54f143bdd9e3c";var a=document.createElement('script');a.setAttribute('async','');a.setAttribute('defer','');a.setAttribute('src','https://cdn.utmify.com.br/scripts/pixel/pixel.js');document.head.appendChild(a);`}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
