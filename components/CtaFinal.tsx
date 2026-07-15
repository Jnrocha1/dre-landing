"use client"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function CtaFinal() {
  const isMobile = useIsMobile()
  return (
    <section style={{ padding: "120px var(--px)", background: "var(--ink)", borderTop: "1px solid var(--bd)", textAlign: "center" }}>
      <div style={{ width: 36, height: 3, borderRadius: 2, background: "var(--amber)", margin: "0 auto 1.5rem" }} />
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: isMobile ? "clamp(1.8rem,8vw,3rem)" : "clamp(2.5rem,5vw,4.5rem)",
        fontWeight: 700, letterSpacing: "-0.035em", lineHeight: 1.05,
        marginBottom: "1.5rem", maxWidth: "16ch", margin: "0 auto 1.5rem",
      }}>
        Seu próximo cliente vai perguntar como você faz tão rápido.
      </h2>
      <p style={{ fontSize: 16, color: "var(--t2)", marginBottom: "2.5rem" }}>
        3 DREs gratuitas. Sem cartão. Sem configuração.
      </p>
      <a href="https://dre-analytics-app.vercel.app/cadastro" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "16px 36px", borderRadius: 8,
        background: "var(--blue)", color: "#fff",
        fontSize: 16, fontWeight: 700, textDecoration: "none",
        boxShadow: "0 4px 28px rgba(37,99,235,0.45)",
      }}>
        Criar conta grátis →
      </a>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap", fontSize: 12, color: "var(--t3)", marginTop: "1.5rem" }}>
        {["3 DREs gratuitas", "Sem cartão de crédito", "Cancele quando quiser"].map(t => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {t}
          </span>
        ))}
      </div>
    </section>
  )
}
