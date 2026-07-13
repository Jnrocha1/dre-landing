"use client"

const ITEMS = [
  "23 indicadores automáticos",
  "Score de saúde 0–100",
  "Alertas inteligentes",
  "Resumo executivo por IA",
  "Análise vertical e horizontal",
  "Heatmap de performance",
  "Comparativo entre empresas",
  "Consolidado de grupos",
  "Projeção de tendência",
  "Dashboard em 8 segundos",
]

export default function TrustStrip() {
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div style={{
      borderTop: "1px solid var(--bd)",
      borderBottom: "1px solid var(--bd)",
      background: "var(--s1)",
      overflow: "hidden",
      padding: "16px 0",
    }}>
      <style>{`
        @keyframes strip-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .trust-track {
          display: flex;
          gap: 0;
          animation: strip-scroll 18s linear infinite;
          width: max-content;
        }
        .trust-track:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .trust-track { animation: none; }
        }
      `}</style>
      <div className="trust-track">
        {doubled.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "1.5rem",
            padding: "0 2rem",
            whiteSpace: "nowrap",
          }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--t2)" }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
