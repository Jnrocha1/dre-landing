"use client"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/lib/use-is-mobile"
import { ChevronLeft, ChevronRight } from "lucide-react"

const DEPS = [
  { av: "MC", nome: "Marcos Costa", cargo: "Contador · Costa & Associados · João Pessoa", texto: "Antes eu levava 3 horas para montar a análise de um cliente. Agora levo 5 minutos. O cliente perguntou se eu tinha contratado um analista.", resultado: "+3h economizadas/cliente" },
  { av: "AF", nome: "Ana Figueiredo", cargo: "Contadora · AF Contabilidade · Recife", texto: "O score de saúde é sensacional. Mostrei ao vivo para o cliente e ele ficou impressionado. Fechei 2 contratos de consultoria naquele mês.", resultado: "+2 contratos no 1º mês" },
  { av: "RL", nome: "Roberto Lima", cargo: "Contador · Lima Gestão · Campina Grande", texto: "Aumentei meus honorários em 40% para os clientes que recebem o dashboard. Eles entendem o valor quando veem a análise pronta em segundos.", resultado: "+40% nos honorários" },
  { av: "PC", nome: "Paulo Cardoso", cargo: "Contador · Cardoso & Filhos · Fortaleza", texto: "Tenho 22 clientes ativos. Antes o fechamento mensal levava uma semana inteira. Agora faço tudo em dois dias. Sobra tempo para prospectar.", resultado: "22 clientes · 2 dias de fechamento" },
]

export default function Depoimentos() {
  const isMobile = useIsMobile()
  const [idx, setIdx] = useState(0)
  const [animating, setAnimating] = useState(false)

  function go(dir: number) {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setIdx(i => (i + dir + DEPS.length) % DEPS.length)
      setAnimating(false)
    }, 200)
  }

  // Auto-avançar
  useEffect(() => {
    const t = setInterval(() => go(1), 6000)
    return () => clearInterval(t)
  }, [])

  const d = DEPS[idx]

  return (
    <section style={{ padding: "100px var(--px)", background: "var(--s1)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "3rem" }}>
        <div style={{ fontSize: 14, color: "var(--t2)", fontStyle: "italic", marginBottom: "0.75rem" }}>Direto de quem usa todo mês.</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Quem usa, não volta<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>para o Excel de antes.</span>
        </h2>
      </div>

      <div style={{ maxWidth: 700 }}>
        {/* Depoimento */}
        <div style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "none",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          marginBottom: "2rem",
        }}>
          {/* Stars */}
          <div style={{ display: "flex", gap: 3, marginBottom: "1.5rem" }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--amber)" stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>

          <blockquote style={{
            fontSize: isMobile ? 17 : 21,
            fontWeight: 400,
            color: "var(--t1)",
            lineHeight: 1.65,
            letterSpacing: "-0.01em",
            marginBottom: "2rem",
          }}>
            "{d.texto}"
          </blockquote>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "var(--s2)", border: "1px solid var(--bd2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "var(--blue)", flexShrink: 0,
            }}>{d.av}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>{d.nome}</div>
              <div style={{ fontSize: 12, color: "var(--t3)" }}>{d.cargo}</div>
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
          <button onClick={() => go(-1)} style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--s2)", border: "1px solid var(--bd2)", color: "var(--t2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={16} />
          </button>
          <div style={{ display: "flex", gap: 6 }}>
            {DEPS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i === idx ? "var(--blue)" : "var(--s3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={() => go(1)} style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--s2)", border: "1px solid var(--bd2)", color: "var(--t2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ fontSize: 11, color: "var(--t3)", marginTop: "1.5rem" }}>*Exemplos ilustrativos de casos de uso.</div>
      </div>
    </section>
  )
}
