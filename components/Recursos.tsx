"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"

const FEATS = [
  { title: "Dashboard com 11 abas", desc: "Visão Geral, An. Vertical, Horizontal, Custos, Despesas, Resultado, Comparativo, Eficiência, Alertas, C-Level e Ranking." },
  { title: "Score de saúde 0–100", desc: "6 critérios automáticos: CMV, resultado, margens, cobertura de juros, tendência e variação de receita.", tag: "Exclusivo" },
  { title: "Projeção de tendência", desc: "Regressão linear automática projetando resultado para os próximos 3 meses com base no histórico." },
  { title: "Alertas inteligentes", desc: "CMV fora do benchmark, cobertura de juros, queda de receita — identificados e explicados automaticamente." },
]

export default function Recursos() {
  const isMobile = useIsMobile()
  return (
    <section id="recursos" style={{ padding: "80px max(2rem, calc((100vw - 1160px)/2))", background: "var(--s1)" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "var(--blue-l, #5e78ff)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
        <span style={{ width: 16, height: 2, background: "var(--blue)", borderRadius: 1, display: "inline-block" }} />
        Recursos
      </div>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: "2rem" }}>
        Tudo que um contador<br />consultivo precisa
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: "1.25rem" }}>
        {FEATS.map((f, i) => (
          <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            whileHover={{ borderColor: "rgba(37,99,235,.3)" }}
            style={{ padding: "1.4rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--t1)", marginBottom: "0.4rem" }}>{f.title}</h3>
            <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>{f.desc}</p>
            {f.tag && <span style={{ display: "inline-block", marginTop: "0.5rem", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 99, background: "rgba(0,214,143,0.15)", color: "var(--green)" }}>{f.tag}</span>}
          </motion.div>
        ))}
        {/* Card largo — resumo IA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ gridColumn: "1/-1", padding: "1.5rem", background: "linear-gradient(135deg, rgba(37,99,235,.1), rgba(0,214,143,.05))", border: "1px solid rgba(37,99,235,.2)", borderRadius: 12, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--t1)", marginBottom: "0.4rem" }}>Resumo executivo por IA</h3>
            <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>Texto profissional em linguagem de negócios, gerado automaticamente. O dono de empresa lê e entende sem ser contador.</p>
            <span style={{ display: "inline-block", marginTop: "0.5rem", fontSize: 10, fontWeight: 700, padding: "2px 9px", borderRadius: 99, background: "rgba(0,214,143,0.15)", color: "var(--green)" }}>Diferencial competitivo</span>
          </div>
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "0.85rem" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.65rem" }}>Exemplo gerado pela IA</p>
            <p style={{ fontSize: 11, color: "var(--t2)", lineHeight: 1.75, borderLeft: "2.5px solid var(--blue)", paddingLeft: 10 }}>
              "A NovaTech Serviços apresentou evolução consistente na margem bruta — subindo de 38% em Janeiro para 45% em Abril. O resultado positivo de R$42.000 em Abril é o primeiro desde Outubro de 2025. O ponto de atenção é a concentração de receita em dois clientes que representam 67% do faturamento..."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
