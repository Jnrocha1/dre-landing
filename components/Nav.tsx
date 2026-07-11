"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

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
        <button
          onClick={() => setIsDark(!isDark)}
          style={{
            width: 36, height: 36, borderRadius: 8,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "var(--t2)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginRight: 8,
          }}
          title={isDark ? "Modo claro" : "Modo escuro"}
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
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
