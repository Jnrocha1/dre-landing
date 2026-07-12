"use client"
import { useRef, useEffect, useState, useCallback } from "react"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Zap, ArrowRight } from "lucide-react"

// ── DADOS ────────────────────────────────────────────────────
const LINHAS = [
  { label: "Receita Bruta de Serviços", valor: 1648349, pct: 100.0, indent: 0, bold: true, tipo: "receita" },
  { label: "(-) Impostos sobre Receita", valor: -247253, pct: -15.0, indent: 1, bold: false, tipo: "deducao" },
  { label: "Receita Líquida", valor: 1401096, pct: 85.0, indent: 0, bold: true, tipo: "receita" },
  { label: "(-) Custo dos Serviços (CMV)", valor: -672526, pct: -40.8, indent: 1, bold: false, tipo: "custo" },
  { label: "Lucro Bruto", valor: 728570, pct: 44.2, indent: 0, bold: true, tipo: "lucro" },
  { label: "(-) Despesas Administrativas", valor: -312841, pct: -19.0, indent: 1, bold: false, tipo: "despesa" },
  { label: "(-) Despesas com Pessoal", valor: -164203, pct: -9.9, indent: 1, bold: false, tipo: "despesa" },
  { label: "(-) Outras Despesas Operacionais", valor: -47354, pct: -2.9, indent: 1, bold: false, tipo: "despesa" },
  { label: "EBITDA Aproximado", valor: 204172, pct: 12.4, indent: 0, bold: true, tipo: "lucro" },
  { label: "(-) Resultado Financeiro Líquido", valor: -93840, pct: -5.7, indent: 1, bold: false, tipo: "despesa" },
  { label: "Resultado Líquido do Período", valor: 110332, pct: 6.7, indent: 0, bold: true, tipo: "lucro" },
]

const KPIS = [
  { label: "Receita Bruta", valor: "R$ 1.648.349", delta: "+18,4%", pos: true },
  { label: "Margem Bruta", valor: "44,2%", delta: "+6,2pp", pos: true },
  { label: "EBITDA", valor: "R$ 204.172", delta: "+31,7%", pos: true },
  { label: "Resultado Líquido", valor: "R$ 110.332", delta: "+44,1%", pos: true },
]

const ALERTAS = [
  { tipo: "g" as const, titulo: "Margem bruta em crescimento consistente", corpo: "Evolução de 38% em Janeiro para 44,2% em Abril — +6,2pp em 4 meses." },
  { tipo: "a" as const, titulo: "Resultado financeiro consome 45,9% do EBITDA", corpo: "Despesas de R$93.840 sugerem oportunidade de refinanciamento da dívida." },
  { tipo: "r" as const, titulo: "Concentração: 2 clientes = 71% da receita", corpo: "Risco de volatilidade significativo caso um contrato não seja renovado." },
]

const RESUMO = `"NovaTech apresenta recuperação sólida no 1º quadrimestre. Margem bruta acima do benchmark setorial de 40%. Principal risco: concentração de receita em dois contratos. Recomenda-se diversificação comercial e refinanciamento da dívida nos próximos 90 dias."`

function fmtBRL(v: number) {
  const abs = Math.abs(v).toLocaleString("pt-BR", { minimumFractionDigits: 0 })
  return (v < 0 ? "(R$ " : "R$ ") + abs + (v < 0 ? ")" : "")
}

// ── HOOK: intersection observer sem scroll-jacking ────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── SEÇÃO 1: NÚMERO DE IMPACTO ────────────────────────────────
function ImpactNumber({
  number, unit, label, sublabel, color = "var(--t1)", delay = 0
}: {
  number: string; unit?: string; label: string; sublabel: string; color?: string; delay?: number
}) {
  const { ref, inView } = useInView(0.3)
  return (
    <div ref={ref} style={{
      textAlign: "center",
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : "translateY(24px)",
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    }}>
      <div style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "clamp(4rem, 14vw, 9rem)",
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        color,
        marginBottom: "0.75rem",
      }}>
        {number}
        {unit && <span style={{ fontSize: "0.45em", fontWeight: 400, color: "var(--t2)", letterSpacing: "-0.02em" }}>{unit}</span>}
      </div>
      <div style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
        {label}
      </div>
      <div style={{ fontSize: "clamp(0.85rem, 1.8vw, 1rem)", color: "var(--t2)", maxWidth: "36ch", margin: "0 auto", lineHeight: 1.6 }}>
        {sublabel}
      </div>
    </div>
  )
}

// ── SEÇÃO 2: TABELA DRE SE MONTANDO ──────────────────────────
function TabelaDRE() {
  const { ref, inView } = useInView(0.05)
  const tipoColor: Record<string, string> = {
    receita: "var(--t1)",
    lucro: "var(--green, #00D68F)",
    custo: "var(--red, #FF3D57)",
    despesa: "var(--red, #FF3D57)",
    deducao: "var(--t2)",
  }

  return (
    <div ref={ref}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <div style={{ width: 2, height: 28, background: "var(--blue, #2563EB)", borderRadius: 1 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--blue, #2563EB)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Extração automática por IA
          </div>
          <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 1 }}>
            NovaTech Serviços · Janeiro — Abril 2026
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 130px 70px",
        padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
        opacity: inView ? 1 : 0, transition: "opacity 0.4s ease 0.1s",
      }}>
        {["Demonstração do Resultado", "Valor", "% Rec."].map((h, i) => (
          <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", textAlign: i > 0 ? "right" : "left" }}>{h}</div>
        ))}
      </div>

      {/* Linhas com stagger */}
      {LINHAS.map((linha, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr 130px 70px",
          padding: "10px 0",
          borderBottom: `1px solid rgba(255,255,255,${linha.bold ? "0.06" : "0.03"})`,
          background: linha.bold ? "rgba(255,255,255,0.015)" : "transparent",
          opacity: inView ? 1 : 0,
          transform: inView ? "none" : "translateX(-10px)",
          transition: `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.07}s, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.07}s`,
        }}>
          <div style={{
            fontSize: linha.bold ? 13 : 12,
            fontWeight: linha.bold ? 600 : 400,
            color: linha.bold ? "var(--t1)" : "var(--t2)",
            paddingLeft: `${linha.indent * 14}px`,
          }}>
            {linha.label}
          </div>
          <div style={{
            fontSize: 12, fontWeight: linha.bold ? 600 : 400,
            color: tipoColor[linha.tipo],
            textAlign: "right", fontVariantNumeric: "tabular-nums",
          }}>
            {fmtBRL(linha.valor)}
          </div>
          <div style={{ fontSize: 11, color: "var(--t3)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
            {Math.abs(linha.pct) > 1 ? `${linha.pct > 0 ? "" : ""}${Math.abs(linha.pct).toFixed(1)}%` : "—"}
          </div>
        </div>
      ))}
    </div>
  )
}

// ── SEÇÃO 3: KPIS ─────────────────────────────────────────────
function KPISection() {
  const { ref, inView } = useInView(0.2)
  return (
    <div ref={ref}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <div style={{ width: 2, height: 28, background: "var(--green, #00D68F)", borderRadius: 1 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--green, #00D68F)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Indicadores calculados
          </div>
          <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 1 }}>4 métricas · geradas automaticamente</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
        {KPIS.map((k, i) => (
          <div key={k.label} style={{
            padding: "1.25rem 1.5rem",
            background: "var(--ink, #0B0F14)",
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
          }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
              {k.label}
            </div>
            <div style={{ fontSize: "clamp(1.1rem, 3vw, 1.5rem)", fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.03em", marginBottom: 6, fontVariantNumeric: "tabular-nums" }}>
              {k.valor}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: k.pos ? "var(--green, #00D68F)" : "var(--red, #FF3D57)" }}>
              {k.pos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {k.delta} vs período anterior
            </div>
          </div>
        ))}
      </div>

      {/* Gráfico de barras */}
      <div style={{
        marginTop: 16,
        padding: "1.25rem 1.5rem",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
      }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
          Receita mensal — evolução
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 72 }}>
          {[368420, 412891, 398654, 468384].map((v, i) => {
            const h = (v / 468384) * 100
            return (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: "100%" }}>
                <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end" }}>
                  <div style={{
                    width: "100%",
                    height: `${h}%`,
                    background: i === 3 ? "var(--blue, #2563EB)" : "rgba(37,99,235,0.4)",
                    borderRadius: "3px 3px 0 0",
                    transform: inView ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "bottom",
                    transition: `transform 0.7s cubic-bezier(0.22,1,0.36,1) ${0.5 + i * 0.1}s`,
                  }} />
                </div>
                <div style={{ fontSize: 9, color: "var(--t3)", whiteSpace: "nowrap" }}>
                  {["Jan", "Fev", "Mar", "Abr"][i]}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── SEÇÃO 4: ALERTAS + IA ─────────────────────────────────────
function AlertasSection() {
  const { ref, inView } = useInView(0.1)
  const [chars, setChars] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!inView) return
    let c = 0
    intervalRef.current = setInterval(() => {
      c += 3
      setChars(Math.min(c, RESUMO.length))
      if (c >= RESUMO.length) clearInterval(intervalRef.current!)
    }, 20)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [inView])

  const corAlerta = {
    r: { bg: "rgba(255,61,87,0.06)", bd: "var(--red, #FF3D57)", c: "rgba(255,61,87,0.9)", Icon: AlertTriangle },
    a: { bg: "rgba(240,165,0,0.06)", bd: "var(--amber, #F0A500)", c: "rgba(240,165,0,0.9)", Icon: AlertTriangle },
    g: { bg: "rgba(0,214,143,0.06)", bd: "var(--green, #00D68F)", c: "rgba(0,214,143,0.9)", Icon: CheckCircle },
  }

  return (
    <div ref={ref}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10, marginBottom: "1.5rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(12px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>
        <div style={{ width: 2, height: 28, background: "var(--amber, #F0A500)", borderRadius: 1 }} />
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--amber, #F0A500)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Análise inteligente
          </div>
          <div style={{ fontSize: 12, color: "var(--t2)", marginTop: 1 }}>3 alertas · resumo executivo gerado por IA</div>
        </div>
      </div>

      {/* Alertas */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: "1.5rem" }}>
        {ALERTAS.map((a, i) => {
          const c = corAlerta[a.tipo]
          const Icon = c.Icon
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "3px 1fr",
              overflow: "hidden",
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateX(-10px)",
              transition: `opacity 0.5s ease ${i * 0.15 + 0.1}s, transform 0.5s ease ${i * 0.15 + 0.1}s`,
            }}>
              <div style={{ background: c.bd }} />
              <div style={{ padding: "1rem 1.1rem", background: c.bg }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4, color: c.c, fontSize: 12, fontWeight: 600 }}>
                  <Icon size={13} color={c.c} />
                  {a.titulo}
                </div>
                <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.6 }}>{a.corpo}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Resumo IA com efeito de digitação */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "1.5rem",
        opacity: inView ? 1 : 0,
        transition: "opacity 0.6s ease 0.5s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: "0.875rem" }}>
          <Zap size={12} color="var(--blue, #2563EB)" />
          <span style={{ fontSize: 10, fontWeight: 700, color: "var(--blue, #2563EB)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Resumo executivo — IA
          </span>
        </div>
        <div style={{
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          color: "var(--t1)",
          lineHeight: 1.8,
          fontWeight: 300,
          maxWidth: "60ch",
        }}>
          {RESUMO.slice(0, chars)}
          {chars < RESUMO.length && inView && (
            <span style={{
              display: "inline-block", width: 1.5, height: "1em",
              background: "var(--blue, #2563EB)",
              marginLeft: 2, verticalAlign: "text-bottom",
              animation: "cur-blink 0.7s step-end infinite",
            }} />
          )}
        </div>
      </div>
    </div>
  )
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────
export default function DashboardScroll() {
  return (
    <>
      <style>{`
        @keyframes cur-blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (prefers-reduced-motion: reduce) {
          *{animation-duration:.01ms!important;transition-duration:.01ms!important}
        }
      `}</style>

      {/* ── BLOCO 1: 3 Números de impacto ── */}
      <section style={{
        padding: "100px max(2rem, calc((100vw - 1100px)/2))",
        background: "var(--ink, #0B0F14)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        {/* Label */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
            O que muda com o DRE Analytics
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "4rem 2rem",
          alignItems: "start",
        }}>
          <ImpactNumber
            number="3h"
            label="economizadas por empresa"
            sublabel="Trabalho manual de planilha eliminado. Por mês, por empresa, para sempre."
            color="var(--t1)"
            delay={0}
          />
          <ImpactNumber
            number="8"
            unit="s"
            label="do PDF ao dashboard completo"
            sublabel="IA extrai, calcula 23 indicadores e gera o relatório automaticamente."
            color="var(--blue, #2563EB)"
            delay={0.15}
          />
          <ImpactNumber
            number="72"
            unit="/100"
            label="score de saúde automático"
            sublabel="6 critérios calculados em tempo real. O contador sabe onde focar."
            color="var(--green, #00D68F)"
            delay={0.3}
          />
        </div>

        {/* Divisor */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "5rem" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <div style={{ fontSize: 11, color: "var(--t3)", whiteSpace: "nowrap", letterSpacing: "0.08em" }}>
            COMO FUNCIONA NA PRÁTICA
          </div>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>
      </section>

      {/* ── BLOCO 2: Tabela DRE se montando ── */}
      <section style={{
        padding: "80px max(2rem, calc((100vw - 840px)/2))",
        background: "var(--s1, #111620)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <TabelaDRE />
      </section>

      {/* ── BLOCO 3: KPIs + gráfico ── */}
      <section style={{
        padding: "80px max(2rem, calc((100vw - 840px)/2))",
        background: "var(--ink, #0B0F14)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <KPISection />
      </section>

      {/* ── BLOCO 4: Alertas + IA ── */}
      <section style={{
        padding: "80px max(2rem, calc((100vw - 840px)/2))",
        background: "var(--s1, #111620)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}>
        <AlertasSection />
      </section>

      {/* ── CTA de transição ── */}
      <section style={{
        padding: "60px max(2rem, calc((100vw - 840px)/2))",
        background: "var(--ink, #0B0F14)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: "1.5rem",
      }}>
        <div>
          <div style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.02em", marginBottom: "0.4rem" }}>
            Tudo isso em 8 segundos.
          </div>
          <div style={{ fontSize: 14, color: "var(--t2)" }}>
            3 DREs gratuitas. Sem cartão. Sem configuração.
          </div>
        </div>
        <a
          href="https://dre-analytics-app.vercel.app/cadastro"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "14px 28px", borderRadius: 8,
            background: "var(--blue, #2563EB)", color: "#fff",
            fontSize: 14, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 24px rgba(37,99,235,0.4)",
            flexShrink: 0,
          }}
        >
          Testar agora <ArrowRight size={15} />
        </a>
      </section>
    </>
  )
}
