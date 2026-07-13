"use client"
import { useRef, useEffect, useState } from "react"
import { useIsMobile } from "@/lib/use-is-mobile"
import { BarChart3, Target, TrendingUp, AlertTriangle, FileText, Layers } from "lucide-react"

function useInView() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, vis }
}

const FEATS = [
  { Icon: BarChart3, titulo: "Dashboard com 11 abas", desc: "Visão Geral, An. Vertical, Horizontal, Custos, Despesas, Resultado, Comparativo, Eficiência, Alertas, C-Level e Ranking." },
  { Icon: Target, titulo: "Score de saúde 0–100", desc: "6 critérios automáticos: CMV, resultado, margens, cobertura de juros, tendência e variação de receita.", badge: "Exclusivo" },
  { Icon: TrendingUp, titulo: "Projeção de tendência", desc: "Regressão linear projetando resultado para os próximos 3 meses com base no histórico da empresa." },
  { Icon: AlertTriangle, titulo: "Alertas inteligentes", desc: "CMV fora do benchmark, cobertura de juros insuficiente, queda de receita — detectados e explicados." },
  { Icon: FileText, titulo: "Resumo executivo por IA", desc: "Texto em linguagem de negócios gerado automaticamente. O cliente entende sem ser contador.", badge: "Diferencial" },
  { Icon: Layers, titulo: "Consolidado de grupos", desc: "Análise consolidada de múltiplas empresas com heatmap de performance por unidade." },
]

export default function Recursos() {
  const isMobile = useIsMobile()
  const { ref, vis } = useInView()

  return (
    <section id="recursos" style={{ padding: "100px var(--px)", background: "var(--ink)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Recursos</div>
        <h2 style={{ fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Tudo que um contador<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>consultivo precisa.</span>
        </h2>
      </div>

      <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "1px", background: "var(--bd)" }}>
        {FEATS.map((f, i) => (
          <div key={f.titulo} style={{
            padding: "2rem",
            background: "var(--ink)",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
          }}>
            <f.Icon size={20} color="var(--blue)" strokeWidth={1.5} style={{ marginBottom: "1rem" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.01em", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: 8 }}>
              {f.titulo}
              {f.badge && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(0,214,143,0.12)", color: "var(--green)" }}>{f.badge}</span>}
            </div>
            <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.7 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
