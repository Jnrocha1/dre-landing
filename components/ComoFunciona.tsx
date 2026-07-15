"use client"
import { useIsMobile } from "@/lib/use-is-mobile"
import { useInView } from "@/lib/use-in-view"

const STEPS = [
  { n: "01", titulo: "Arraste o PDF", desc: "Upload da DRE em PDF. Qualquer formato, qualquer sistema contábil que gere PDF.", detalhe: "3 segundos" },
  { n: "02", titulo: "IA processa tudo", desc: "A IA lê o PDF, identifica cada linha e calcula automaticamente 23 indicadores financeiros.", detalhe: "5 segundos" },
  { n: "03", titulo: "Dashboard pronto", desc: "11 abas de análise, score de saúde, alertas e resumo executivo. Pronto para apresentar.", detalhe: "Instantâneo" },
]

export default function ComoFunciona() {
  const isMobile = useIsMobile()
  const { ref, vis } = useInView()

  return (
    <section id="como-funciona" style={{ padding: "100px var(--px)", background: "var(--s1)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "4rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Três passos.<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>Oito segundos.</span>
        </h2>
      </div>

      <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? "2rem" : "1px", background: isMobile ? "transparent" : "var(--bd)" }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            padding: isMobile ? "0" : "2.5rem 2rem",
            background: isMobile ? "transparent" : "var(--s1)",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(20px)",
            transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
          }}>
            <div style={{ fontSize: "clamp(3rem,8vw,5rem)", fontWeight: 800, color: "rgba(37,99,235,0.12)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "1rem" }}>
              {s.n}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>{s.titulo}</div>
            <div style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.7, marginBottom: "1rem" }}>{s.desc}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--green)", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {s.detalhe}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
