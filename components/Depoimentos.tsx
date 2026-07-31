"use client"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/lib/use-is-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"

// IMPORTANTE: estes são cenários ilustrativos de uso, não depoimentos de clientes reais — o
// produto ainda não tem uma base de clientes pagantes grande o suficiente para depoimentos
// genuínos. Por isso, propositalmente: (1) nenhum nome de pessoa/empresa/cidade real, (2) sem
// estrelas de avaliação (isso sinalizaria "review real" pra quem lê, e pode violar política de
// anúncio do Meta/Google, que proíbem depoimento fabricado apresentado como real), (3) rótulo
// "Cenário ilustrativo" visível em cada card, não só um aviso pequeno no rodapé. Trocar por
// depoimentos reais assim que houver clientes pagantes dispostos a ceder o relato.
const CENARIOS = [
  { persona: "Contador autônomo, carteira pequena", texto: "Hoje montar a análise financeira de um cliente pode levar horas — juntando números, montando gráfico, escrevendo o resumo. Com o DRE Analytics, isso vira minutos: sobe o PDF e o dashboard já sai pronto.", resultado: "Horas → minutos por análise" },
  { persona: "Escritório de contabilidade médio", texto: "O score de saúde financeira e os alertas automáticos dão um jeito fácil de mostrar valor pro cliente numa reunião, sem precisar montar apresentação do zero toda vez.", resultado: "Análise pronta pra apresentar" },
  { persona: "Contador que atende múltiplos clientes", texto: "Ter os DREs de todos os clientes organizados num único lugar, com histórico e comparação entre eles, facilita enxergar quem precisa de mais atenção.", resultado: "Visão consolidada da carteira" },
  { persona: "Escritório buscando diferenciação", texto: "Entregar um dashboard interativo em vez de uma planilha estática pode ajudar a justificar um posicionamento de consultoria, não só de lançamento contábil.", resultado: "Mais valor percebido pelo cliente" },
]

export default function Depoimentos() {
  const isMobile = useIsMobile()
  const [idx, setIdx] = useState(0)
  const [animating, setAnimating] = useState(false)

  function go(dir: number) {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setIdx(i => (i + dir + CENARIOS.length) % CENARIOS.length)
      setAnimating(false)
    }, 200)
  }

  // Auto-avançar
  useEffect(() => {
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [])

  const d = CENARIOS[idx]

  return (
    <section style={{ padding: "100px var(--px)", background: "var(--s1)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ fontSize: 14, color: "var(--t2)", fontStyle: "italic", marginBottom: "0.75rem" }}>Como o DRE Analytics pode encaixar na sua rotina.</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Menos planilha manual,<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>mais tempo pra analisar.</span>
        </h2>
      </div>

      <div style={{ maxWidth: 700 }}>
        {/* Cenário */}
        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          marginBottom: "2rem",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 700,
            color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em",
            border: "1px solid var(--bd2)", borderRadius: 999, padding: "3px 10px",
            marginBottom: "1.25rem",
          }}>
            Cenário ilustrativo
          </div>

          <blockquote style={{
            fontSize: isMobile ? 17 : 21,
            fontWeight: 400,
            color: "var(--t1)",
            lineHeight: 1.65,
            letterSpacing: "-0.01em",
            marginBottom: "1.5rem",
          }}>
            {d.texto}
          </blockquote>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>{d.persona}</div>
            </div>
            <div style={{
              marginLeft: "auto",
              fontSize: 12, fontWeight: 600, color: "var(--green)",
              padding: "4px 10px", background: "rgba(0,214,143,0.08)",
              borderRadius: 6, whiteSpace: "nowrap",
            }}>
              {d.resultado}
            </div>
          </div>
        </div>

        {/* Controles */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => go(-1)} className="icon-btn" style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--s2)", border: "1px solid var(--bd2)", color: "var(--t2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={16} />
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            {CENARIOS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i === idx ? "var(--blue)" : "var(--s3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={() => go(1)} className="icon-btn" style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--s2)", border: "1px solid var(--bd2)", color: "var(--t2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ fontSize: 11, color: "var(--t3)", marginTop: "1.5rem" }}>Cenários ilustrativos de uso — não representam depoimentos de clientes específicos.</div>
      </div>
    </section>
  )
}
