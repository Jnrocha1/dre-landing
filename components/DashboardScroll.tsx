"use client"
import { useRef, useState, useEffect } from "react"
import { useScroll, useSpring } from "framer-motion"
import { Check, BarChart3, AlertTriangle, TrendingUp, FileText, Cpu } from "lucide-react"

function PhoneScreen({ phase, progress }: { phase: number; progress: number }) {
  const fade = (p: number, s: number, e: number) =>
    Math.max(0, Math.min(1, (p - s) / (e - s)))

  if (phase === 0) {
    // Tela de upload
    const step1 = fade(progress, 0, 0.25)
    const step2 = fade(progress, 0.22, 0.47)
    const step3 = fade(progress, 0.44, 0.69)
    const step4 = fade(progress, 0.66, 0.91)
    const done = progress > 0.88

    return (
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "1.5rem 1rem", background: "#0B0F14",
      }}>
        {/* Logo pequeno */}
        <div style={{ fontSize: 11, fontWeight: 700, color: "#6B9FFF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem", opacity: step1 }}>
          DRE Analytics
        </div>

        {/* Ícone de arquivo */}
        <div style={{
          width: 64, height: 64, borderRadius: 16,
          background: done ? "rgba(0,214,143,0.12)" : "rgba(37,99,235,0.12)",
          border: `1px solid ${done ? "rgba(0,214,143,0.3)" : "rgba(37,99,235,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: "1rem",
          opacity: step1,
          transition: "background 0.5s, border-color 0.5s",
        }}>
          {done
            ? <Check size={28} color="var(--green, #00d68f)" strokeWidth={2.5} />
            : <FileText size={28} color="#6B9FFF" strokeWidth={1.5} />
          }
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: "#F0F2F5", marginBottom: 4, opacity: step1 }}>
          {done ? "Análise concluída!" : "DRE_NovaTech_Abr2026.pdf"}
        </div>
        <div style={{ fontSize: 11, color: "#8892A0", marginBottom: "1.25rem", opacity: step1 }}>
          {done ? "Dashboard pronto" : "Processando com IA..."}
        </div>

        {/* Progress bar */}
        <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden", marginBottom: "1rem", opacity: step1 }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: done ? "var(--green, #00d68f)" : "linear-gradient(90deg, #2563EB, #00d68f)",
            width: `${progress * 110}%`,
            maxWidth: "100%",
            transition: "none",
          }} />
        </div>

        {/* Steps */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { label: "PDF lido — 31 linhas", icon: <FileText size={11} />, op: step1 },
            { label: "IA identificou a DRE", icon: <Cpu size={11} />, op: step2 },
            { label: "23 indicadores calculados", icon: <BarChart3 size={11} />, op: step3 },
            { label: "Dashboard atualizado", icon: <Check size={11} strokeWidth={2.5} />, op: step4 },
          ].map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 7,
              fontSize: 10, color: s.op > 0.5 ? "var(--green, #00d68f)" : "#8892A0",
              opacity: s.op, transform: `translateX(${(1 - s.op) * -8}px)`,
              transition: "none",
            }}>
              {s.icon} {s.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (phase === 1) {
    // Dashboard
    const kpi = fade(progress, 0, 0.2)
    const bars = fade(progress, 0.15, 0.4)
    const line = fade(progress, 0.35, 0.6)

    const KPIS = [
      { l: "Receita", v: "R$412K", c: "#F0F2F5" },
      { l: "Margem", v: "45,1%", c: "#00d68f" },
      { l: "CMV", v: "48,2%", c: "#ff3d57" },
      { l: "Resultado", v: "R$42K", c: "#00d68f" },
    ]

    return (
      <div style={{ height: "100%", background: "#0B0F14", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {/* Header */}
        <div style={{ opacity: kpi }}>
          <div style={{ fontSize: 9, color: "#8892A0", marginBottom: 2 }}>NovaTech Serviços · Abr 2026</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#F0F2F5" }}>Visão Geral</div>
        </div>

        {/* KPI grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, opacity: kpi, transform: `translateY(${(1 - kpi) * 10}px)`, transition: "none" }}>
          {KPIS.map(k => (
            <div key={k.l} style={{ background: "#111620", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "6px 8px" }}>
              <div style={{ fontSize: 8, color: "#8892A0", marginBottom: 2 }}>{k.l}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: k.c }}>{k.v}</div>
            </div>
          ))}
        </div>

        {/* Score */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#111620", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "6px 8px", opacity: kpi, transition: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", border: "2px solid #00d68f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#00d68f", flexShrink: 0 }}>72</div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#F0F2F5" }}>Score Saudável</div>
            <div style={{ fontSize: 8, color: "#8892A0" }}>Margem acima do benchmark</div>
          </div>
        </div>

        {/* Gráfico de barras */}
        <div style={{ background: "#111620", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "6px 8px", opacity: bars, transition: "none" }}>
          <div style={{ fontSize: 8, color: "#8892A0", marginBottom: 6 }}>Receita vs CMV — 4 meses</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 40 }}>
            {[68, 82, 74, 65].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: "rgba(37,99,235,0.65)", borderRadius: "2px 2px 0 0", transform: `scaleY(${bars})`, transformOrigin: "bottom", transition: `transform 0.5s ease ${i * 0.07}s` }} />
            ))}
            {[32, 38, 28, 22].map((h, i) => (
              <div key={i + 4} style={{ flex: 1, height: `${h}%`, background: "rgba(255,61,87,0.55)", borderRadius: "2px 2px 0 0", transform: `scaleY(${bars})`, transformOrigin: "bottom", transition: `transform 0.5s ease ${i * 0.07 + 0.28}s` }} />
            ))}
          </div>
        </div>

        {/* Linha de tendência */}
        <div style={{ background: "#111620", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "6px 8px", opacity: line, transition: "none" }}>
          <div style={{ fontSize: 8, color: "#8892A0", marginBottom: 4 }}>Margem bruta % — tendência</div>
          <svg viewBox="0 0 100 30" style={{ width: "100%", height: 28 }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d68f" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#00d68f" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,24 L25,20 L50,15 L75,10 L100,6" stroke="#00d68f" strokeWidth="1.5" fill="none" strokeLinecap="round"
              style={{ strokeDasharray: 150, strokeDashoffset: 150 * (1 - line), transition: "stroke-dashoffset 1s ease" }} />
            <path d="M0,24 L25,20 L50,15 L75,10 L100,6 L100,30 L0,30Z" fill="url(#pg)" opacity={line} />
          </svg>
        </div>
      </div>
    )
  }

  // Phase 2: Alertas
  const ALERTS = [
    { t: "g", title: "Margem em alta", body: "+12pp em 5 meses", icon: <TrendingUp size={11} /> },
    { t: "r", title: "CMV elevado", body: "Acima de 70% da rec. líquida", icon: <AlertTriangle size={11} /> },
    { t: "a", title: "Juros a monitorar", body: "Cobertura de 1,1× — atenção", icon: <AlertTriangle size={11} /> },
  ]
  const AC: Record<string, { bg: string; bd: string; c: string }> = {
    r: { bg: "rgba(255,61,87,.1)", bd: "#ff3d57", c: "#ff8898" },
    a: { bg: "rgba(240,165,0,.1)", bd: "#f0a500", c: "#ffca6a" },
    g: { bg: "rgba(0,214,143,.1)", bd: "#00d68f", c: "#40ffa0" },
  }

  return (
    <div style={{ height: "100%", background: "#0B0F14", padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#F0F2F5", marginBottom: 2 }}>Alertas Inteligentes</div>
      <div style={{ fontSize: 9, color: "#8892A0", marginBottom: 4 }}>NovaTech Serviços · 3 alertas gerados</div>
      {ALERTS.map((a, i) => {
        const c = AC[a.t]
        const op = fade(progress, i * 0.2, i * 0.2 + 0.3)
        return (
          <div key={i} style={{
            padding: "8px 10px", borderRadius: 8, borderLeft: `3px solid ${c.bd}`,
            background: c.bg, color: c.c, fontSize: 10,
            opacity: op, transform: `translateX(${(1 - op) * -10}px)`, transition: "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 700, marginBottom: 2 }}>
              {a.icon} {a.title}
            </div>
            <div style={{ color: c.c, opacity: 0.8 }}>{a.body}</div>
          </div>
        )
      })}
      {/* Resumo IA */}
      <div style={{
        marginTop: 4, padding: "8px 10px", borderRadius: 8,
        background: "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(0,214,143,0.05))",
        border: "1px solid rgba(37,99,235,0.2)",
        opacity: fade(progress, 0.6, 0.85), transition: "none",
      }}>
        <div style={{ fontSize: 8, color: "#6B9FFF", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Resumo por IA</div>
        <div style={{ fontSize: 9, color: "#8892A0", lineHeight: 1.6 }}>
          "Margem saudável e em crescimento. Foco em reduzir CMV para maximizar resultado."
        </div>
      </div>
    </div>
  )
}

export default function DashboardScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(375)

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
      setViewportWidth(window.innerWidth)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    return smooth.on("change", (v) => {
      if (v < 0.33) { setPhase(0); setProgress(v / 0.33) }
      else if (v < 0.66) { setPhase(1); setProgress((v - 0.33) / 0.33) }
      else { setPhase(2); setProgress((v - 0.66) / 0.34) }
    })
  }, [smooth])

  // Dimensões do phone
  const phoneW = isMobile ? Math.min(260, viewportWidth * 0.65) : 300
  const phoneH = phoneW * 2.05

  return (
    <div ref={containerRef} style={{ height: "220vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0,
        height: "100vh",
        display: "flex", flexDirection: isMobile ? "column" : "row",
        alignItems: "center", justifyContent: "center",
        gap: isMobile ? "1.5rem" : "4rem",
        padding: isMobile ? "calc(var(--nav) + 1rem) 1.5rem 1rem" : "0 var(--px)",
        overflow: "hidden",
        background: "var(--ink)",
      }}>

        {/* Texto lateral */}
        <div style={{ maxWidth: isMobile ? "100%" : 420, textAlign: isMobile ? "center" : "left", order: isMobile ? 1 : 0 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "#6B9FFF", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
            <span style={{ width: 16, height: 2, background: "var(--blue, #2563EB)", borderRadius: 1, display: "inline-block" }} />
            {phase === 0 ? "Upload inteligente" : phase === 1 ? "Dashboard completo" : "Alertas automáticos"}
          </div>
          <h2 style={{ fontSize: isMobile ? "clamp(1.6rem,6vw,2.5rem)" : "clamp(2rem,3.5vw,3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem", color: "var(--t1, #F0F2F5)" }}>
            {phase === 0 && <>Arraste o PDF.<br /><span style={{ color: "var(--green, #00d68f)" }}>8 segundos.</span></>}
            {phase === 1 && <>Dashboard<br /><span style={{ color: "var(--blue, #2563EB)" }}>gerado pela IA.</span></>}
            {phase === 2 && <>Alertas que<br /><span style={{ color: "#f0a500" }}>você não veria.</span></>}
          </h2>
          <p style={{ fontSize: isMobile ? 13 : 14, color: "var(--t2, #8892A0)", lineHeight: 1.7 }}>
            {phase === 0 && "Qualquer PDF de DRE de qualquer sistema contábil. A IA extrai tudo automaticamente."}
            {phase === 1 && "KPIs, gráficos, score de saúde e tendência em um dashboard que o cliente entende."}
            {phase === 2 && "CMV fora do benchmark, cobertura de juros, queda de receita — detectados e explicados."}
          </p>
          {/* Indicadores de fase */}
          <div style={{ display: "flex", gap: 6, marginTop: "1.5rem", justifyContent: isMobile ? "center" : "flex-start" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: i === phase ? 24 : 6, height: 6, borderRadius: 3, background: i === phase ? "var(--blue, #2563EB)" : "rgba(255,255,255,0.15)", transition: "all 0.4s ease" }} />
            ))}
          </div>
        </div>

        {/* iPhone Mockup */}
        <div style={{ position: "relative", flexShrink: 0, order: isMobile ? 0 : 1 }}>
          {/* Sombra de fundo */}
          <div style={{
            position: "absolute", inset: -20,
            background: `radial-gradient(ellipse, ${phase === 0 ? "rgba(37,99,235,0.2)" : phase === 1 ? "rgba(0,214,143,0.15)" : "rgba(240,165,0,0.15)"} 0%, transparent 70%)`,
            transition: "background 0.8s ease",
            pointerEvents: "none",
          }} />

          {/* Frame do iPhone */}
          <div style={{
            width: phoneW, height: phoneH,
            borderRadius: phoneW * 0.12,
            background: "linear-gradient(145deg, #2a2a3a, #1a1a28)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: phoneW * 0.04,
            boxShadow: "0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.1)",
            position: "relative",
          }}>
            {/* Notch */}
            <div style={{
              position: "absolute", top: phoneW * 0.04, left: "50%", transform: "translateX(-50%)",
              width: phoneW * 0.3, height: phoneW * 0.06,
              background: "#1a1a28", borderRadius: 99,
              zIndex: 10,
            }} />

            {/* Tela */}
            <div style={{
              width: "100%", height: "100%",
              borderRadius: phoneW * 0.09,
              overflow: "hidden",
              background: "#0B0F14",
            }}>
              <PhoneScreen phase={phase} progress={progress} />
            </div>

            {/* Barra home */}
            <div style={{
              position: "absolute", bottom: phoneW * 0.03, left: "50%", transform: "translateX(-50%)",
              width: phoneW * 0.35, height: 4,
              background: "rgba(255,255,255,0.3)", borderRadius: 99,
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
