"use client"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Footer() {
  const isMobile = useIsMobile()
  return (
    <footer style={{
      padding: "3rem var(--px)",
      background: "var(--s1)", borderTop: "1px solid var(--bd)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr 1fr",
        gap: isMobile ? "2rem" : "3rem",
        marginBottom: "3rem",
      }}>
        {/* Logo + tagline */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-dre-full.png" alt="DRE Analytics" style={{ height: 32, width: "auto", objectFit: "contain", marginBottom: "1rem" }} />
          <p style={{ fontSize: 13, color: "var(--t3)", lineHeight: 1.7, maxWidth: "30ch" }}>
            Inteligência financeira para contadores. Upload da DRE, dashboard em 8 segundos.
          </p>
        </div>

        {/* Links produto */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Produto</div>
          {[["Como funciona","#como-funciona"],["Recursos","#recursos"],["Planos","#planos"],["FAQ","#faq"]].map(([l,h]) => (
            <a key={l} href={h} style={{ display: "block", fontSize: 13, color: "var(--t2)", textDecoration: "none", marginBottom: "0.5rem" }}>{l}</a>
          ))}
        </div>

        {/* Links conta */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>Conta</div>
          {[["Entrar","https://app.dreanalytics.com.br/login"],["Cadastrar","https://app.dreanalytics.com.br/cadastro"],["Ver planos","#planos"]].map(([l,h]) => (
            <a key={l} href={h} style={{ display: "block", fontSize: 13, color: "var(--t2)", textDecoration: "none", marginBottom: "0.5rem" }}>{l}</a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--bd)", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
        <div style={{ fontSize: 12, color: "var(--t3)" }}>© 2026 DRE Analytics · Todos os direitos reservados</div>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          <a href="https://app.dreanalytics.com.br/termos" style={{ fontSize: 12, color: "var(--t3)", textDecoration: "none" }}>Termos de Uso</a>
          <a href="https://app.dreanalytics.com.br/privacidade" style={{ fontSize: 12, color: "var(--t3)", textDecoration: "none" }}>Privacidade</a>
        </div>
      </div>
    </footer>
  )
}
