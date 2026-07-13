"use client"
import { useEffect, useState } from "react"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: "var(--nav)",
      padding: "0 var(--px)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(11,15,20,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--bd)" : "1px solid transparent",
      transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
    }}>
      {/* Logo */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-dre-full.png" alt="DRE Analytics" style={{ height: isMobile ? 32 : 38, width: "auto", objectFit: "contain" }} />
      </a>

      {/* Links centro */}
      {!isMobile && (
        <div style={{ display: "flex", gap: "2rem", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {[["Como funciona","#como-funciona"],["Recursos","#recursos"],["Planos","#planos"],["FAQ","#faq"]].map(([l,h]) => (
            <a key={l} href={h} style={{ fontSize: 14, fontWeight: 500, color: "var(--t2)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--t1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--t2)")}>
              {l}
            </a>
          ))}
        </div>
      )}

      {/* Direita */}
      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, flexShrink: 0 }}>
        <a href="https://dre-analytics-app.vercel.app/login"
          style={{ fontSize: 13, fontWeight: 500, color: "var(--t2)", textDecoration: "none", whiteSpace: "nowrap", display: isMobile ? "none" : "block" }}>
          Entrar
        </a>
        <a href="https://dre-analytics-app.vercel.app/cadastro"
          style={{
            padding: isMobile ? "8px 14px" : "9px 20px",
            borderRadius: 7, background: "var(--blue)", color: "#fff",
            fontSize: isMobile ? 12 : 13, fontWeight: 700,
            textDecoration: "none", whiteSpace: "nowrap",
            boxShadow: "0 2px 12px rgba(37,99,235,0.4)",
          }}>
          {isMobile ? "Começar →" : "Começar grátis →"}
        </a>
      </div>
    </nav>
  )
}
