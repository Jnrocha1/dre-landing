"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: 64, padding: "0 max(2rem, calc((100vw - 1160px)/2))",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "color-mix(in srgb, var(--ink) 97%, transparent)" : "color-mix(in srgb, var(--ink) 85%, transparent)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--bd)",
      transition: "background 0.3s",
    }}>
      <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-dre-full.png" alt="DRE Analytics" style={{ height: 44, width: "auto", objectFit: "contain" }} />
      </a>
      {!isMobile && (
        <div style={{ display: "flex", gap: "2.25rem" }}>
          {["Como funciona","Recursos","Planos"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ","-")}`} style={{ fontSize: 14, fontWeight: 500, color: "var(--t2)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <a href="https://dre-analytics-app.vercel.app/cadastro" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: isMobile ? "8px 14px" : "10px 24px", borderRadius: 8, background: "var(--blue)", color: "#fff",
          fontSize: isMobile ? 13 : 14, fontWeight: 700, textDecoration: "none",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
        }}>Começar grátis <ArrowRight size={14} /></a>
      </div>
    </nav>
  )
}
