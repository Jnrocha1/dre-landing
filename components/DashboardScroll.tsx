"use client"
import { useRef, useState, useEffect } from "react"
import { useScroll, useSpring, motion, AnimatePresence } from "framer-motion"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap } from "lucide-react"

// ── DADOS FICTÍCIOS ──────────────────────────────────────────
const EMPRESA = "NovaTech Serviços Ltda."
const PERIODO = "Janeiro — Abril 2026"

const LINHAS_DRE = [
  { label: "Receita Bruta de Serviços", valor: 1648349, indent: 0, bold: true },
  { label: "(-) Deduções e Impostos", valor: -247253, indent: 1, bold: false },
  { label: "Receita Líquida", valor: 1401096, indent: 0, bold: true },
  { label: "(-) Custo dos Serviços Prestados (CMV)", valor: -672526, indent: 1, bold: false },
  { label: "Lucro Bruto", valor: 728570, indent: 0, bold: true },
  { label: "(-) Despesas Operacionais", valor: -524398, indent: 1, bold: false },
  { label: "    Despesas Administrativas", valor: -312841, indent: 2, bold: false },
  { label: "    Despesas com Pessoal", valor: -164203, indent: 2, bold: false },
  { label: "    Outras Despesas", valor: -47354, indent: 2, bold: false },
  { label: "Resultado Operacional (EBITDA aprox.)", valor: 204172, indent: 0, bold: true },
  { label: "(-) Resultado Financeiro Líquido", valor: -93840, indent: 1, bold: false },
  { label: "Resultado Líquido do Período", valor: 110332, indent: 0, bold: true },
]

const KPIS = [
  { label: "Receita Bruta", valor: "R$ 1.648.349", delta: "+18,4%", pos: true },
  { label: "Margem Bruta", valor: "52,0%", delta: "+6,2pp", pos: true },
  { label: "EBITDA", valor: "R$ 204.172", delta: "+31,7%", pos: true },
  { label: "Resultado Líquido", valor: "R$ 110.332", delta: "+44,1%", pos: true },
  { label: "CMV / Rec. Líquida", valor: "48,0%", delta: "-4,1pp", pos: true },
  { label: "Score de Saúde", valor: "72 / 100", delta: "Saudável", pos: true },
]

const ALERTAS = [
  {
    tipo: "positivo" as const,
    titulo: "Margem bruta em alta consistente",
    corpo: "A margem bruta evoluiu de 45,8% em Janeiro para 52,0% em Abril — ganho de 6,2 pontos percentuais em quatro meses. A melhoria é atribuída à renegociação dos contratos de fornecimento realizada em Fevereiro.",
  },
  {
    tipo: "atencao" as const,
    titulo: "Resultado financeiro consome 45,9% do EBITDA",
    corpo: "As despesas financeiras de R$ 93.840 representam 45,9% do EBITDA gerado no período. A cobertura de juros de 2,2× está dentro do aceitável, mas a reestruturação da dívida de longo prazo reduziria o custo financeiro em aproximadamente R$ 28.000/mês.",
  },
  {
    tipo: "critico" as const,
    titulo: "Concentração de receita em 2 clientes",
    corpo: "Os dois maiores clientes respondem por 71% da receita bruta. Esse grau de concentração cria risco significativo de volatilidade: a perda de qualquer um deles impactaria o resultado em mais de R$ 580.000 anuais.",
  },
]

const RESUMO_IA = `A NovaTech Serviços apresenta trajetória de recuperação sólida no primeiro quadrimestre de 2026. A margem bruta de 52% supera o benchmark setorial de 48%, reflexo direto da renegociação de contratos concluída em Fevereiro.

O principal vetor de risco não está na operação — está na estrutura financeira e na concentração de clientes. Com 71% da receita concentrada em dois contratos e despesas financeiras que consomem quase metade do EBITDA, a empresa opera com baixa margem de segurança a choques externos.

Recomendações prioritárias: (1) iniciar prospecção ativa para diluir concentração de receita nos próximos 90 dias; (2) avaliar refinanciamento da dívida de longo prazo — a taxa atual está 3,2pp acima da média de mercado para o perfil da empresa.`

// ── UTILITÁRIOS ──────────────────────────────────────────────
function fmtBRL(v: number): string {
  const abs = Math.abs(v)
  const str = abs.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return (v < 0 ? "(R$ " : "R$ ") + str + (v < 0 ? ")" : "")
}

function fmtPct(v: number): string {
  return ((v / 1648349) * 100).toFixed(1) + "%"
}

// ── FASE 1: EXTRAÇÃO DO PDF ───────────────────────────────────
function FaseExtracao({ progress }: { progress: number }) {
  const linhasVisiveis = Math.floor(progress * LINHAS_DRE.length * 1.4)

  return (
    <div style={{ width: "100%", maxWidth: 780, margin: "0 auto" }}>
      {/* Eyebrow */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: "2.5rem",
        opacity: Math.min(1, progress * 5),
        transform: `translateY(${Math.max(0, (1 - progress * 5) * 16)}px)`,
        transition: "none",
      }}>
        <div style={{ width: 1, height: 32, background: "var(--blue, #2563EB)" }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue, #2563EB)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Extração automática
          </div>
          <div style={{ fontSize: 13, color: "var(--t2, #8892A0)", marginTop: 2 }}>
            {EMPRESA} · {PERIODO}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: progress > 0.9 ? "var(--green, #00D68F)" : "var(--blue, #2563EB)",
            boxShadow: `0 0 8px ${progress > 0.9 ? "rgba(0,214,143,0.6)" : "rgba(37,99,235,0.6)"}`,
            animation: progress > 0.9 ? "none" : "pulse 1s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 11, color: "var(--t2, #8892A0)", fontVariantNumeric: "tabular-nums" }}>
            {progress > 0.9 ? "Concluído" : `${Math.min(Math.floor(progress * 120), 100)}%`}
          </span>
        </div>
      </div>

      {/* Tabela DRE sendo extraída */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Header da tabela */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 120px 80px",
          padding: "10px 0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          opacity: Math.min(1, progress * 5),
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Linha da DRE</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>Valor (R$)</div>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: "right" }}>% Rec.</div>
        </div>

        {/* Linhas aparecendo progressivamente */}
        {LINHAS_DRE.map((linha, i) => {
          const aparecer = i < linhasVisiveis
          const delay = i * 0.06

          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 120px 80px",
              padding: "9px 0",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              opacity: aparecer ? 1 : 0,
              transform: aparecer ? "none" : "translateX(-8px)",
              transition: aparecer ? `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s` : "none",
              background: linha.bold ? "rgba(255,255,255,0.015)" : "transparent",
            }}>
              <div style={{
                fontSize: linha.bold ? 13 : 12,
                fontWeight: linha.bold ? 600 : 400,
                color: linha.bold ? "var(--t1, #F0F2F5)" : "var(--t2, #8892A0)",
                paddingLeft: `${linha.indent * 16}px`,
                fontVariantNumeric: "tabular-nums",
              }}>
                {linha.label}
              </div>
              <div style={{
                fontSize: linha.bold ? 13 : 12,
                fontWeight: linha.bold ? 600 : 400,
                color: linha.valor > 0 ? (linha.bold ? "var(--t1, #F0F2F5)" : "var(--green, #00D68F)") : "var(--red, #FF3D57)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}>
                {fmtBRL(linha.valor)}
              </div>
              <div style={{
                fontSize: 11,
                color: "var(--t3, #3D4A5C)",
                textAlign: "right",
                fontVariantNumeric: "tabular-nums",
              }}>
                {Math.abs(linha.valor) > 10000 ? fmtPct(Math.abs(linha.valor)) : "—"}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: "1.5rem", height: 1, background: "rgba(255,255,255,0.06)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          background: progress > 0.9 ? "var(--green, #00D68F)" : "var(--blue, #2563EB)",
          width: `${Math.min(progress * 110, 100)}%`,
          transition: "none",
          borderRadius: 1,
        }} />
      </div>
    </div>
  )
}

// ── FASE 2: DASHBOARD ─────────────────────────────────────────
function FaseDashboard({ progress }: { progress: number }) {
  const fade = (s: number, e: number) => Math.max(0, Math.min(1, (progress - s) / (e - s)))

  const MESES = ["Jan", "Fev", "Mar", "Abr"]
  const RECEITA = [368420, 412891, 398654, 468384]
  const RESULTADO = [14820, 22340, 31890, 41282]
  const MARGEM = [42.1, 46.8, 49.4, 52.0]

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      {/* Eyebrow */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: "2.5rem",
        opacity: fade(0, 0.15),
        transform: `translateY(${(1 - fade(0, 0.15)) * 16}px)`,
        transition: "none",
      }}>
        <div style={{ width: 1, height: 32, background: "var(--green, #00D68F)" }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--green, #00D68F)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Dashboard gerado
          </div>
          <div style={{ fontSize: 13, color: "var(--t2, #8892A0)", marginTop: 2 }}>
            {EMPRESA} · {PERIODO}
          </div>
        </div>
      </div>

      {/* KPIs — grade 3x2 */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1,
        background: "rgba(255,255,255,0.06)",
        borderRadius: 2, overflow: "hidden",
        marginBottom: "1.5rem",
        opacity: fade(0.05, 0.25),
        transform: `translateY(${(1 - fade(0.05, 0.25)) * 12}px)`,
        transition: "none",
      }}>
        {KPIS.map((k, i) => (
          <div key={i} style={{
            padding: "1.25rem 1.5rem",
            background: "var(--ink, #0B0F14)",
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
              {k.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--t1, #F0F2F5)", letterSpacing: "-0.03em", marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>
              {k.valor}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: k.pos ? "var(--green, #00D68F)" : "var(--red, #FF3D57)" }}>
              {k.pos ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de barras */}
      <div style={{
        marginBottom: "1.5rem",
        opacity: fade(0.22, 0.42),
        transform: `translateY(${(1 - fade(0.22, 0.42)) * 12}px)`,
        transition: "none",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Receita mensal e resultado líquido
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 10, color: "var(--t3, #3D4A5C)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 1, background: "var(--blue, #2563EB)", display: "inline-block" }} />Receita
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 8, height: 8, borderRadius: 1, background: "var(--green, #00D68F)", display: "inline-block" }} />Resultado
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, alignItems: "end", height: 120 }}>
          {MESES.map((mes, i) => {
            const hRec = (RECEITA[i] / Math.max(...RECEITA)) * 100
            const hRes = (RESULTADO[i] / Math.max(...RECEITA)) * 100
            const p = fade(0.22, 0.42)
            return (
              <div key={mes} style={{ display: "flex", flexDirection: "column", gap: 2, height: "100%", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: "90%" }}>
                  <div style={{
                    flex: 3, height: `${hRec}%`,
                    background: "var(--blue, #2563EB)", opacity: 0.7,
                    borderRadius: "2px 2px 0 0",
                    transform: `scaleY(${p})`, transformOrigin: "bottom",
                    transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`,
                  }} />
                  <div style={{
                    flex: 1, height: `${hRes}%`,
                    background: "var(--green, #00D68F)",
                    borderRadius: "2px 2px 0 0",
                    transform: `scaleY(${p})`, transformOrigin: "bottom",
                    transition: `transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.07 + 0.2}s`,
                  }} />
                </div>
                <div style={{ fontSize: 10, color: "var(--t3, #3D4A5C)", textAlign: "center", paddingTop: 4 }}>{mes}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Margem bruta — linha com SVG animado */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "1.25rem",
        opacity: fade(0.4, 0.6),
        transform: `translateY(${(1 - fade(0.4, 0.6)) * 12}px)`,
        transition: "none",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Margem bruta % — evolução mensal
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--green, #00D68F)", letterSpacing: "-0.03em" }}>
            {MARGEM[3]}%
          </div>
        </div>

        <div style={{ position: "relative", height: 60 }}>
          <svg viewBox="0 0 400 60" style={{ width: "100%", height: "100%" }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="margem-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D68F" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00D68F" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 L133,38 L266,26 L400,8"
              stroke="var(--green, #00D68F)" strokeWidth="1.5" fill="none" strokeLinecap="round"
              style={{
                strokeDasharray: 500,
                strokeDashoffset: `${500 * (1 - fade(0.4, 0.6))}`,
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
            <path d="M0,50 L133,38 L266,26 L400,8 L400,60 L0,60Z" fill="url(#margem-grad)" opacity={fade(0.4, 0.6)} />
            {MARGEM.map((v, i) => (
              <text key={i} x={i * 133 + 2} y={52 - (v - 40) * 2.5} fontSize="9" fill="rgba(0,214,143,0.7)" style={{ fontVariantNumeric: "tabular-nums" }}>
                {v}%
              </text>
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}

// ── FASE 3: ALERTAS + IA ──────────────────────────────────────
function FaseAlertas({ progress }: { progress: number }) {
  const fade = (s: number, e: number) => Math.max(0, Math.min(1, (progress - s) / (e - s)))

  const corAlerta = {
    positivo: { bg: "rgba(0,214,143,0.06)", borda: "var(--green, #00D68F)", texto: "rgba(0,214,143,0.9)", icon: <CheckCircle size={14} color="#00D68F" /> },
    atencao: { bg: "rgba(240,165,0,0.06)", borda: "var(--amber, #F0A500)", texto: "rgba(240,165,0,0.9)", icon: <AlertTriangle size={14} color="#F0A500" /> },
    critico: { bg: "rgba(255,61,87,0.06)", borda: "var(--red, #FF3D57)", texto: "rgba(255,61,87,0.9)", icon: <AlertTriangle size={14} color="#FF3D57" /> },
  }

  const charsVisiveis = Math.floor(fade(0.55, 1) * RESUMO_IA.length)

  return (
    <div style={{ width: "100%", maxWidth: 780, margin: "0 auto" }}>
      {/* Eyebrow */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        marginBottom: "2.5rem",
        opacity: fade(0, 0.15),
        transform: `translateY(${(1 - fade(0, 0.15)) * 16}px)`,
        transition: "none",
      }}>
        <div style={{ width: 1, height: 32, background: "var(--amber, #F0A500)" }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--amber, #F0A500)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Análise inteligente
          </div>
          <div style={{ fontSize: 13, color: "var(--t2, #8892A0)", marginTop: 2 }}>
            {EMPRESA} · {PERIODO}
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <Zap size={12} color="var(--amber, #F0A500)" />
          <span style={{ fontSize: 11, color: "var(--t2, #8892A0)" }}>3 alertas gerados</span>
        </div>
      </div>

      {/* Alertas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: "2rem" }}>
        {ALERTAS.map((a, i) => {
          const c = corAlerta[a.tipo]
          const op = fade(i * 0.14, i * 0.14 + 0.2)
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "4px 1fr",
              gap: 0, overflow: "hidden",
              opacity: op,
              transform: `translateX(${(1 - op) * -12}px)`,
              transition: "none",
            }}>
              <div style={{ background: c.borda, minHeight: "100%" }} />
              <div style={{ padding: "1.1rem 1.25rem", background: c.bg }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6, color: c.texto, fontSize: 12, fontWeight: 600 }}>
                  {c.icon}
                  {a.titulo}
                </div>
                <div style={{ fontSize: 12, color: "var(--t2, #8892A0)", lineHeight: 1.7 }}>
                  {a.corpo}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resumo executivo por IA — efeito de digitação */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "1.5rem",
        opacity: fade(0.48, 0.62),
        transition: "none",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: "1rem",
        }}>
          <div style={{ width: 1, height: 20, background: "var(--blue, #2563EB)" }} />
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--blue, #2563EB)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            Resumo executivo — gerado por IA
          </div>
        </div>
        <div style={{
          fontSize: 14,
          color: "var(--t1, #F0F2F5)",
          lineHeight: 1.8,
          maxWidth: "65ch",
          fontWeight: 300,
          letterSpacing: "0.01em",
        }}>
          {RESUMO_IA.slice(0, charsVisiveis)}
          {charsVisiveis < RESUMO_IA.length && (
            <span style={{
              display: "inline-block", width: 1, height: "1em",
              background: "var(--blue, #2563EB)",
              marginLeft: 2, verticalAlign: "text-bottom",
              animation: "blink 0.8s step-end infinite",
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function DashboardScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  const [fase, setFase] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    return smooth.on("change", (v) => {
      if (v < 0.33) { setFase(0); setProgress(v / 0.33) }
      else if (v < 0.66) { setFase(1); setProgress((v - 0.33) / 0.33) }
      else { setFase(2); setProgress((v - 0.66) / 0.34) }
    })
  }, [smooth])

  const FASES = [
    { label: "Extração", desc: "IA lê o PDF e estrutura a DRE" },
    { label: "Dashboard", desc: "KPIs, gráficos e tendências" },
    { label: "Inteligência", desc: "Alertas e resumo executivo" },
  ]

  return (
    <>
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      <div ref={containerRef} style={{ height: "280vh", position: "relative" }}>
        <div style={{
          position: "sticky", top: 0,
          height: "100vh",
          display: "flex",
          background: "var(--ink, #0B0F14)",
          overflow: "hidden",
        }}>
          {/* Coluna lateral — indicador de fase */}
          {!isMobile && (
            <div style={{
              width: 200, flexShrink: 0,
              borderRight: "1px solid rgba(255,255,255,0.06)",
              padding: "calc(var(--nav, 64px) + 2rem) 2rem 2rem",
              display: "flex", flexDirection: "column",
              justifyContent: "center", gap: "0.5rem",
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3, #3D4A5C)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                Em andamento
              </div>
              {FASES.map((f, i) => (
                <div key={i} style={{
                  padding: "0.75rem",
                  borderLeft: `2px solid ${i === fase ? "var(--blue, #2563EB)" : "rgba(255,255,255,0.06)"}`,
                  paddingLeft: "0.875rem",
                  transition: "border-color 0.4s ease",
                }}>
                  <div style={{ fontSize: 12, fontWeight: i === fase ? 600 : 400, color: i === fase ? "var(--t1, #F0F2F5)" : "var(--t3, #3D4A5C)", marginBottom: 2 }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: 11, color: i === fase ? "var(--t2, #8892A0)" : "var(--t3, #3D4A5C)" }}>
                    {f.desc}
                  </div>
                  {i === fase && (
                    <div style={{ marginTop: 6, height: 1, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "var(--blue, #2563EB)", width: `${progress * 100}%`, transition: "none" }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Conteúdo principal */}
          <div style={{
            flex: 1,
            padding: isMobile
              ? `calc(var(--nav, 64px) + 1rem) 1.5rem 2rem`
              : "calc(var(--nav, 64px) + 2rem) 3rem 2rem",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex", flexDirection: "column", justifyContent: "center",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={fase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {fase === 0 && <FaseExtracao progress={progress} />}
                {fase === 1 && <FaseDashboard progress={progress} />}
                {fase === 2 && <FaseAlertas progress={progress} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicador mobile — dots na base */}
          {isMobile && (
            <div style={{
              position: "absolute", bottom: "1rem", left: "50%", transform: "translateX(-50%)",
              display: "flex", gap: 6,
            }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  height: 4, width: i === fase ? 20 : 4, borderRadius: 2,
                  background: i === fase ? "var(--blue, #2563EB)" : "rgba(255,255,255,0.15)",
                  transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                }} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
