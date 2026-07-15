"use client"
import { useIsMobile } from "@/lib/use-is-mobile"
import { useInView } from "@/lib/use-in-view"
import { BarChart3, Target, TrendingUp, AlertTriangle, FileText, Layers } from "lucide-react"

const DESTAQUES = [
  { Icon: Target, titulo: "Score de saúde 0–100", desc: "6 critérios automáticos: CMV, resultado, margens, cobertura de juros, tendência e variação de receita.", badge: "Exclusivo" },
  { Icon: FileText, titulo: "Resumo executivo por IA", desc: "Texto em linguagem de negócios gerado automaticamente. O cliente entende sem ser contador.", badge: "Diferencial" },
]

const OUTROS = [
  { Icon: BarChart3, titulo: "Dashboard com 11 abas", desc: "Visão Geral, An. Vertical, Horizontal, Custos, Despesas, Resultado, Comparativo, Eficiência, Alertas, C-Level e Ranking." },
  { Icon: TrendingUp, titulo: "Projeção de tendência", desc: "Regressão linear projetando resultado para os próximos 3 meses com base no histórico da empresa." },
  { Icon: AlertTriangle, titulo: "Alertas inteligentes", desc: "CMV fora do benchmark, cobertura de juros insuficiente, queda de receita: detectados e explicados." },
  { Icon: Layers, titulo: "Consolidado de grupos", desc: "Análise consolidada de múltiplas empresas com heatmap de performance por unidade." },
]

export default function Recursos() {
  const isMobile = useIsMobile()
  const { ref: destaquesRef, vis: destaquesVis } = useInView()
  const { ref: outrosRef, vis: outrosVis } = useInView()

  return (
    <section id="recursos" style={{ padding: "100px var(--px)", background: "var(--ink)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Tudo que um contador<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>consultivo precisa.</span>
        </h2>
      </div>

      {/* Destaques — os 2 diferenciais reais, com mais peso visual e um pedaço de UI real */}
      <div ref={destaquesRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: isMobile ? "1.25rem" : "1.5rem", marginBottom: "1.5rem" }}>
        {DESTAQUES.map((f, i) => (
          <div key={f.titulo} style={{
            padding: "2.25rem",
            background: "var(--s1)",
            border: "1px solid var(--bd2)",
            borderRadius: 16,
            opacity: destaquesVis ? 1 : 0,
            transform: destaquesVis ? "none" : "translateY(18px)",
            transition: `opacity 0.55s ease ${i * 0.1}s, transform 0.55s ease ${i * 0.1}s`,
          }}>
            <f.Icon size={26} color="var(--blue)" strokeWidth={1.5} style={{ marginBottom: "1.25rem" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
              <div style={{ fontSize: 19, fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.015em" }}>{f.titulo}</div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: "rgba(0,214,143,0.12)", color: "var(--green)" }}>{f.badge}</span>
            </div>
            <div style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{f.desc}</div>

            {i === 0 ? (
              <div style={{ padding: "1rem 1.125rem", background: "var(--s2)", borderRadius: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Score de saúde</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--t1)", fontVariantNumeric: "tabular-nums" }}>72 / 100</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "var(--s3)", overflow: "hidden" }}>
                  <div style={{ width: "72%", height: "100%", background: "var(--green)", borderRadius: 3 }} />
                </div>
                <div style={{ fontSize: 11, color: "var(--green)", marginTop: 6 }}>Saudável</div>
              </div>
            ) : (
              <div style={{ padding: "1rem 1.125rem", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Resumo por IA</div>
                <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, fontStyle: "italic" }}>
                  "Margem acima do benchmark. Risco principal: concentração de receita em 2 clientes."
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Outros recursos — grid mais compacto, peso visual menor de propósito */}
      <div ref={outrosRef} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "1px", background: "var(--bd)" }}>
        {OUTROS.map((f, i) => (
          <div key={f.titulo} style={{
            padding: "1.5rem",
            background: "var(--ink)",
            opacity: outrosVis ? 1 : 0,
            transform: outrosVis ? "none" : "translateY(14px)",
            transition: `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`,
          }}>
            <f.Icon size={17} color="var(--blue)" strokeWidth={1.5} style={{ marginBottom: "0.85rem" }} />
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.01em", marginBottom: "0.4rem" }}>{f.titulo}</div>
            <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
