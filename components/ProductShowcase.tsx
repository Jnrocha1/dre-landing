"use client"
import { useIsMobile } from "@/lib/use-is-mobile"
import { useInView } from "@/lib/use-in-view"

const LINHAS = [
  { label: "Receita Bruta de Serviços", valor: 1648349, pct: "100,0%", indent: 0, bold: true, cor: "var(--t1)" },
  { label: "(-) Impostos sobre Receita", valor: -247253, pct: "15,0%", indent: 1, bold: false, cor: "var(--t2)" },
  { label: "Receita Líquida", valor: 1401096, pct: "85,0%", indent: 0, bold: true, cor: "var(--t1)" },
  { label: "(-) Custo dos Serviços", valor: -672526, pct: "40,8%", indent: 1, bold: false, cor: "var(--red)" },
  { label: "Lucro Bruto", valor: 728570, pct: "44,2%", indent: 0, bold: true, cor: "var(--green)" },
  { label: "(-) Despesas Operacionais", valor: -524398, pct: "31,8%", indent: 1, bold: false, cor: "var(--red)" },
  { label: "EBITDA", valor: 204172, pct: "12,4%", indent: 0, bold: true, cor: "var(--green)" },
  { label: "(-) Resultado Financeiro", valor: -93840, pct: "5,7%", indent: 1, bold: false, cor: "var(--red)" },
  { label: "Resultado Líquido", valor: 110332, pct: "6,7%", indent: 0, bold: true, cor: "var(--green)" },
]

function fmtBRL(v: number) {
  const abs = Math.abs(v).toLocaleString("pt-BR")
  return v < 0 ? `(R$ ${abs})` : `R$ ${abs}`
}

export default function ProductShowcase() {
  const isMobile = useIsMobile()
  const { ref: tableRef, vis: tableVis } = useInView()
  const { ref: kpiRef, vis: kpiVis } = useInView()

  return (
    <section id="produto" style={{ padding: `80px var(--px)`, background: "var(--ink)" }}>

      {/* Título da seção */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1rem" }}>
          Do PDF ao dashboard.<br />
          <span style={{ color: "var(--t2)", fontWeight: 400 }}>Sem digitar nada.</span>
        </h2>
        <p style={{ fontSize: 15, color: "var(--t2)", maxWidth: "44ch", margin: "0 auto", lineHeight: 1.7 }}>
          A IA lê o PDF, estrutura a DRE e gera análises completas. Você apresenta para o cliente em minutos.
        </p>
      </div>

      {/* Layout 2 colunas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: isMobile ? "3rem" : "4rem",
        alignItems: "start",
      }}>

        {/* Coluna 1: Tabela DRE */}
        <div ref={tableRef}>
          <div style={{ marginBottom: "1.5rem" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              01. Extração automática
            </div>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--t1)", marginBottom: "0.5rem" }}>
              A DRE aparece estruturada
            </div>
            <div style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.6 }}>
              Qualquer PDF de qualquer sistema contábil. Cada linha identificada, classificada e valorada.
            </div>
          </div>

          {/* Tabela */}
          <div style={{ border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 110px", padding: "10px 14px", background: "var(--s2)", borderBottom: "1px solid var(--bd)" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>Linha da DRE</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "right" }}>Valor</div>
            </div>
            {LINHAS.map((l, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "1fr 110px",
                padding: "9px 14px",
                borderBottom: i < LINHAS.length - 1 ? "1px solid var(--bd)" : "none",
                background: l.bold ? "rgba(255,255,255,0.015)" : "transparent",
                opacity: tableVis ? 1 : 0,
                transform: tableVis ? "none" : "translateX(-8px)",
                transition: `opacity 0.45s ease ${i * 0.06 + 0.1}s, transform 0.45s ease ${i * 0.06 + 0.1}s`,
              }}>
                <div style={{ fontSize: l.bold ? 13 : 12, fontWeight: l.bold ? 600 : 400, color: l.bold ? "var(--t1)" : "var(--t2)", paddingLeft: l.indent * 12 }}>
                  {l.label}
                </div>
                <div style={{ fontSize: 12, fontWeight: l.bold ? 600 : 400, color: l.cor, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  {fmtBRL(l.valor)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 2: KPIs + alertas */}
        <div ref={kpiRef} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
              02. Dashboard completo
            </div>
            <div style={{ fontSize: isMobile ? 18 : 22, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--t1)", marginBottom: "0.5rem" }}>
              23 indicadores calculados
            </div>
            <div style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.6 }}>
              KPIs, gráficos, score de saúde e alertas inteligentes. Tudo gerado automaticamente.
            </div>
          </div>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--bd)", borderRadius: 12, overflow: "hidden" }}>
            {[
              { l: "Receita Bruta", v: "R$ 1.648.349", d: "▲ 18,4%", p: true },
              { l: "Margem Bruta", v: "44,2%", d: "▲ 6,2pp", p: true },
              { l: "EBITDA", v: "R$ 204.172", d: "▲ 31,7%", p: true },
              { l: "Score Saúde", v: "72 / 100", d: "Saudável", p: true },
            ].map((k, i) => (
              <div key={k.l} style={{
                padding: "1rem 1.125rem", background: "var(--s1)",
                opacity: kpiVis ? 1 : 0,
                transform: kpiVis ? "none" : "translateY(12px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{k.l}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.02em", marginBottom: 4, fontVariantNumeric: "tabular-nums" }}>{k.v}</div>
                <div style={{ fontSize: 11, color: k.p ? "var(--green)" : "var(--red)" }}>{k.d}</div>
              </div>
            ))}
          </div>

          {/* Alertas */}
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { tipo: "g", t: "Margem em crescimento", b: "De 38% em Jan para 44,2% em Abr. +6,2pp." },
              { tipo: "a", t: "Resultado financeiro elevado", b: "Despesas consomem 45,9% do EBITDA." },
              { tipo: "r", t: "Concentração de receita", b: "2 clientes = 71% da receita total." },
            ].map((a, i) => {
              const cores: Record<string, { bd: string; bg: string; c: string }> = {
                g: { bd: "var(--green)", bg: "rgba(0,214,143,0.06)", c: "rgba(0,214,143,0.9)" },
                a: { bd: "var(--amber)", bg: "rgba(240,165,0,0.06)", c: "rgba(240,165,0,0.9)" },
                r: { bd: "var(--red)", bg: "rgba(255,61,87,0.06)", c: "rgba(255,61,87,0.9)" },
              }
              const c = cores[a.tipo]
              return (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "3px 1fr",
                  overflow: "hidden", borderRadius: 4,
                  opacity: kpiVis ? 1 : 0,
                  transform: kpiVis ? "none" : "translateX(-8px)",
                  transition: `opacity 0.5s ease ${i * 0.1 + 0.4}s, transform 0.5s ease ${i * 0.1 + 0.4}s`,
                }}>
                  <div style={{ background: c.bd }} />
                  <div style={{ padding: "0.7rem 0.9rem", background: c.bg }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: c.c, marginBottom: 2 }}>{a.t}</div>
                    <div style={{ fontSize: 11, color: "var(--t2)" }}>{a.b}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Resumo IA */}
          <div style={{ padding: "1rem 1.125rem", background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 8 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--blue)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Resumo por IA</div>
            <div style={{ fontSize: 12, color: "var(--t2)", lineHeight: 1.7, fontStyle: "italic" }}>
              "Margem acima do benchmark. Risco principal: concentração de receita em 2 clientes. Recomenda-se diversificação comercial nos próximos 90 dias."
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
