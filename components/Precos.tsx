"use client"
import { useIsMobile } from "@/lib/use-is-mobile"
import { useInView } from "@/lib/use-in-view"
import { Check, X } from "lucide-react"

const PLANS = [
  {
    name: "Trial", price: "Grátis", per: "3 DREs · sem cartão", popular: false,
    feats: [["1 empresa", true],["3 DREs gratuitas", true],["Dashboard completo", true],["Consolidado/Comparativo", false],["Histórico ilimitado", false]],
  },
  {
    name: "Starter", price: "R$ 97", per: "/mês", popular: false,
    feats: [["Até 5 empresas", true],["DREs ilimitadas", true],["2 anos de histórico", true],["Consolidado/Comparativo", false],["Suporte prioritário", false]],
  },
  {
    name: "Pro", price: "R$ 197", per: "/mês", popular: true,
    feats: [["Até 15 empresas", true],["DREs ilimitadas", true],["5 anos de histórico", true],["Consolidado de grupos", true],["Comparativo entre empresas", true]],
  },
  {
    name: "Premium", price: "R$ 297", per: "/mês", popular: false,
    feats: [["Até 30 empresas", true],["Histórico ilimitado", true],["Tudo do plano Pro", true],["Suporte prioritário", true],["+R$9/empresa adicional", true]],
  },
]

export default function Precos() {
  const isMobile = useIsMobile()
  const { ref, vis } = useInView()
  return (
    <section id="planos" style={{ padding: "100px var(--px)", background: "var(--ink)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Quanto custa continuar<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>fazendo isso na mão?</span>
        </h2>
        <p style={{ fontSize: 14, color: "var(--t3)", marginTop: "1rem" }}>Cancele quando quiser · Sem fidelidade · Sem taxa de implantação</p>
      </div>

      <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "1px", background: "var(--bd)", border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden" }}>
        {PLANS.map((p, i) => (
          <div key={p.name} style={{
            padding: "1.75rem",
            background: p.popular ? "var(--s2)" : "var(--s1)",
            display: "flex", flexDirection: "column",
            position: "relative",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
          }}>
            {p.popular && (
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "var(--blue)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: "0 0 6px 6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Mais popular
              </div>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", marginTop: p.popular ? "0.75rem" : 0 }}>{p.name}</div>
            <div style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.25rem" }}>{p.price}</div>
            <div style={{ fontSize: 12, color: "var(--t3)", marginBottom: "1.5rem" }}>{p.per}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
              {p.feats.map(([l, ok]) => (
                <div key={String(l)} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: ok ? "var(--t2)" : "var(--t3)" }}>
                  {ok ? <Check size={13} color="var(--green)" strokeWidth={2.5} /> : <X size={13} color="var(--t3)" strokeWidth={2} />}
                  {l}
                </div>
              ))}
            </div>
            <a href="https://dre-analytics-app.vercel.app/cadastro" style={{
              padding: "11px", borderRadius: 7, textAlign: "center",
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              background: p.popular ? "var(--blue)" : "var(--s3)",
              color: p.popular ? "#fff" : "var(--t2)",
              border: p.popular ? "none" : "1px solid var(--bd2)",
            }}>
              {p.name === "Trial" ? "Começar grátis" : `Assinar ${p.name}`}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
