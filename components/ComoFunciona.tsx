"use client"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { useIsMobile } from "@/lib/use-is-mobile"

const STEPS = [
  { n: "01", title: "Arraste o PDF", desc: "Upload direto na plataforma. Qualquer formato, qualquer sistema contábil que gere PDF.", time: "3 segundos" },
  { n: "02", title: "IA processa tudo", desc: "A IA lê o PDF, identifica cada linha e calcula automaticamente 23 indicadores financeiros.", time: "5 segundos" },
  { n: "03", title: "Dashboard pronto", desc: "11 abas de análise, score de saúde, alertas e resumo executivo em linguagem de negócios.", time: "Pronto para apresentar" },
]

export default function ComoFunciona() {
  const isMobile = useIsMobile()
  return (
    <section id="como-funciona" style={{ padding: "clamp(40px, 8vw, 80px) var(--px)" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "var(--blue-l, #5e78ff)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
        <span style={{ width: 16, height: 2, background: "var(--blue)", borderRadius: 1, display: "inline-block" }} />
        Como funciona
      </div>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 7vw, 4rem)", lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
        3 passos.<br /><span style={{ color: "var(--green)" }}>8 segundos.</span>
      </h2>
      <p style={{ fontSize: "0.92rem", color: "var(--t2)", maxWidth: "min(460px, 100%)", lineHeight: 1.7, marginBottom: "2rem" }}>
        Sem configuração. Sem integração com ERP. Funciona com qualquer PDF de DRE de qualquer sistema contábil.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1.25rem" }}>
        {STEPS.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -4, borderColor: "rgba(37,99,235,.4)" }}
            style={{ padding: isMobile ? "1.25rem" : "1.5rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 13, position: "relative", cursor: "default" }}>
            <div style={{ fontWeight: 800, fontSize: "2.8rem", color: "rgba(37,99,235,0.14)", lineHeight: 1, marginBottom: "0.35rem" }}>{s.n}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--t1)", marginBottom: "0.35rem" }}>{s.title}</h3>
            <p style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>{s.desc}</p>
            <div style={{ marginTop: "0.8rem", fontSize: 10, fontWeight: 700, color: "var(--green)", display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={12} /> {s.time}
            </div>
            {!isMobile && i < 2 && <div style={{ position: "absolute", top: "50%", right: "-1rem", transform: "translateY(-50%)", color: "var(--blue)", display: "flex" }}><ArrowRight size={16} /></div>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
