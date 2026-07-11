"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"

const DEPS = [
  { av: "MC", name: "Marcos Costa", role: "Contador · Costa & Associados · João Pessoa", text: "Antes eu levava 3 horas para montar a análise de um cliente. Agora levo 5 minutos. O cliente perguntou se eu tinha contratado um analista." },
  { av: "AF", name: "Ana Figueiredo", role: "Contadora · AF Contabilidade · Recife", text: "O score de saúde é sensacional. Mostrei ao vivo para o cliente e ele ficou impressionado. Fechei 2 contratos de consultoria naquele mês." },
  { av: "RL", name: "Roberto Lima", role: "Contador · Lima Gestão · Campina Grande", text: "Aumentei meus honorários em 40% para os clientes que recebem o dashboard. Eles entendem o valor quando veem a análise pronta em segundos." },
]

export default function Depoimentos() {
  const isMobile = useIsMobile()
  return (
    <section style={{ padding: "80px max(2rem, calc((100vw - 1160px)/2))" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "var(--blue-l, #5e78ff)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
        <span style={{ width: 16, height: 2, background: "var(--blue)", borderRadius: 1, display: "inline-block" }} />
        Depoimentos
      </div>
      <h2 style={{ fontWeight: 800, fontSize: "clamp(2rem, 4.5vw, 4rem)", lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: "2.5rem" }}>
        Contadores que<br /><span style={{ color: "var(--green)" }}>já mudaram</span>
      </h2>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: "1.25rem" }}>
        {DEPS.map((d, i) => (
          <motion.div key={d.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
            whileHover={{ y: -3, borderColor: "rgba(37,99,235,.22)" }}
            style={{ padding: "1.5rem", background: "var(--s1)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 13 }}>
            <div style={{ color: "var(--amber)", fontSize: 13, marginBottom: "0.85rem", letterSpacing: 2 }}>★★★★★</div>
            <p style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.7, marginBottom: "1rem", fontStyle: "italic" }}>
              <span style={{ color: "var(--blue)", fontSize: 22, fontStyle: "normal", lineHeight: 0, verticalAlign: -8, marginRight: 2 }}>"</span>
              {d.text}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#6B9FFF", flexShrink: 0 }}>{d.av}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t1)" }}>{d.name}</div>
                <div style={{ fontSize: 10, color: "var(--t3)" }}>{d.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
