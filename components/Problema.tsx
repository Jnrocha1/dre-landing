"use client"
import { motion } from "framer-motion"
import { Clock, BarChart3, Banknote, AlertTriangle } from "lucide-react"
import { useIsMobile } from "@/lib/use-is-mobile"

const ITEMS = [
  { icon: Clock, title: "2 a 4 horas por empresa por mês", desc: "Copiando valores de PDF para planilha célula por célula." },
  { icon: BarChart3, title: "Gráficos que o cliente não entende", desc: "Planilha de Excel não tem impacto. O dono não sabe o que fazer com os números." },
  { icon: Banknote, title: "Honorários que não crescem", desc: "Mais clientes = mais digitação. Os honorários não refletem o valor entregue." },
]

export default function Problema() {
  const isMobile = useIsMobile()
  return (
    <section style={{ padding: "clamp(40px, 8vw, 80px) var(--px)", background: "var(--s1)" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "3rem", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "var(--blue-l, #5e78ff)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            <span style={{ width: 16, height: 2, background: "var(--blue)", borderRadius: 1, display: "inline-block" }} />
            O problema de todo contador
          </div>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 7vw, 4rem)", lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
            DRE virou PDF.<br />Você virou <span style={{ color: "var(--red)" }}>Excel.</span>
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--t2)", maxWidth: "min(460px, 100%)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
            Todo mês o mesmo ritual manual. Horas de digitação que não são contabilidade consultiva.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {ITEMS.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                style={{ display: "flex", alignItems: "flex-start", gap: "0.85rem", padding: "1rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,61,87,.1)", border: "1px solid rgba(255,61,87,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon size={16} color="#ff8898" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: "var(--t1)", marginBottom: 2 }}>{item.title}</h4>
                  <p style={{ fontSize: 11, color: "var(--t2)", lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,61,87,.18)", borderRadius: 14, padding: "1.15rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: "var(--red)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.8rem" }}>
              <AlertTriangle size={12} /> Antes do DRE Analytics
            </div>
            {["Receber o PDF da DRE por email","Abrir planilha Excel do mês anterior","Copiar manualmente cada valor","Atualizar fórmulas e gráficos","Exportar para PDF e enviar","Cliente liga perguntando o que significa"].map((s, i) => (
              <motion.div key={s} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "rgba(255,61,87,.04)", borderRadius: 6, fontSize: 11, color: "var(--t2)", marginBottom: 6 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(255,61,87,.12)", color: "var(--red)", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i+1}</div>
                {s}
              </motion.div>
            ))}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: 8, background: "rgba(255,61,87,.07)", borderRadius: 6, fontSize: 11, color: "var(--red)", textAlign: "center", fontWeight: 700, marginTop: "0.25rem" }}>
              <Clock size={13} /> 3 horas por empresa · todo mês · sem fim
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
