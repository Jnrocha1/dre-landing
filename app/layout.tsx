import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { MetaPixel } from "@/components/MetaPixel"
import { AttributionCapture } from "@/components/AttributionCapture"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const SITE_URL = "https://dreanalytics.com.br"
const OG_IMAGE = "/og-image.png"
const TITLE = "DRE Analytics | Análise Financeira em 8 Segundos"
const DESCRIPTION = "Upload do PDF da DRE e dashboard completo em 8 segundos com IA"

// metadataBase + openGraph/twitter: sem isso, um link compartilhado no WhatsApp/Facebook/LinkedIn
// aparecia sem card visual (ou com preview quebrado, já que og:image relativo sem metadataBase
// não resolve pra URL absoluta) — importante justamente pro cenário de tráfego pago, onde o link
// da campanha circula fora do navegador (grupo de WhatsApp, DM, etc.) antes de alguém clicar.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "DRE Analytics",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <MetaPixel />
        <AttributionCapture />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
