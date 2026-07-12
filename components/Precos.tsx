"use client"
import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { useIsMobile } from "@/lib/use-is-mobile"

const PLANS = [
  { name: "Trial", price: "Grátis", per: "3 DREs para testar · Sem cartão", feats: [["1 empresa",true],["3 DREs gratuitas",true],["Dashboard completo",true],["Consolidado/Comparativo",false]], popular: false },
  { name: "Starter", price: "R$97", per: "/mês · ou R$970/ano", feats: [["Até 5 empresas",true],["DREs ilimitadas",true],["2 anos de histórico",true],["Consolidado/Comparativo",false]], popular: false },
  { name: "Pro", price: "R$197", per: "/mês · ou R$1.970/ano", feats: [["Até 15 empresas",true],["DREs ilimitadas",true],["5 anos de histórico",true],["Consolidado de grupos",true],["Comparativo entre empresas",true]], popular: true },
  { name: "Premium", price: "R$297", per: "/mês · ou R$2.970/ano", feats: [["Até 30 empresas",true],["Histórico ilimitado",true],["Tudo do plano Pro",true],["Suporte prioritário",true],["+R$9/empresa adicional",true]], popular: false },
]

export default function Precos() {
  const isMobile = useIsMobile()
  return (
    <section id="planos" style={{ padding: "clamp(40px, 8vw, 80px) var(--px)", background: "var(--s1)" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "var(--blue-l, #5e78ff)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
        <span style={{ width: 16, height: 2, background: "var(--blue)", borderRadius: 1, display: "inline-block" }} />
        Planos e preços
      </div>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 7vw, 4rem)", lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
        Simples.<br /><span style={{ color: "var(--blue)" }}>Sem surpresas.</span>
      </h2>
      <p style={{ color: "var(--t2)", marginBottom: "2.5rem", fontSize: "0.95rem" }}>Cancele quando quiser. Sem fidelidade. Sem taxa de implantação.</p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)", gap: "1.25rem" }}>
        {PLANS.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            style={{ padding: "1.65rem", maxWidth: isMobile ? "min(380px, 92vw)" : "none", margin: isMobile ? "0 auto" : 0, width: "100%", background: p.popular ? "linear-gradient(180deg,rgba(37,99,235,.08),var(--s1))" : "var(--ink)", border: `1px solid ${p.popular ? "var(--blue)" : "rgba(255,255,255,0.06)"}`, borderRadius: 13, display: "flex", flexDirection: "column", position: "relative", boxShadow: p.popular ? "0 0 30px rgba(37,99,235,.12)" : "none" }}>
            {p.popular && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "var(--blue)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: "0 0 7px 7px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Mais popular</div>}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.35rem" }}>{p.name}</div>
            <div style={{ fontWeight: 800, fontSize: "2.6rem", color: "var(--t1)", lineHeight: 1 }}>{p.price}</div>
            <div style={{ fontSize: 10, color: "var(--t3)", marginBottom: "1.1rem" }}>{p.per}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, marginBottom: "1.1rem" }}>
              {p.feats.map(([label, ok]) => (
                <div key={String(label)} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--t2)" }}>
                  {ok ? <Check size={14} color="var(--green)" /> : <X size={14} color="var(--t3)" />}{label}
                </div>
              ))}
            </div>
            <a href="https://dre-analytics-app.vercel.app/cadastro" style={{ padding: 10, borderRadius: 8, fontSize: 13, fontWeight: 700, textAlign: "center", textDecoration: "none", display: "block", background: p.popular ? "var(--blue)" : "var(--s2)", color: p.popular ? "#fff" : "var(--t2)", border: p.popular ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
              {p.name === "Trial" ? "Começar grátis" : `Assinar ${p.name}`}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
