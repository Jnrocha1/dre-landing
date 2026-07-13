"use client"
import { useState } from "react"
import { useIsMobile } from "@/lib/use-is-mobile"
import { Plus, Minus } from "lucide-react"

const ITEMS = [
  { q: "Funciona com qualquer sistema contábil?", a: "Sim. O DRE Analytics processa qualquer PDF de DRE, independente do sistema que gerou — Domínio, Alterdata, Questor, Contabilizei, ou qualquer outro. Se gera PDF, funciona." },
  { q: "O cliente precisa ter acesso ao sistema?", a: "Não. O dashboard é do contador. Você apresenta para o cliente como quiser — compartilhando a tela, exportando PDF ou imprimindo. O cliente não precisa de login." },
  { q: "Quantas empresas posso cadastrar?", a: "Depende do plano. Trial: 1 empresa. Starter: até 5. Pro: até 15. Premium: até 30 com opção de adicionar mais." },
  { q: "Posso exportar os dados?", a: "Sim. O dashboard permite exportar em PDF os relatórios de análise. A funcionalidade de exportação de dados brutos (CSV) está disponível nos planos Pro e Premium." },
  { q: "Como funciona o período trial?", a: "Você pode processar 3 DREs gratuitamente, sem cartão de crédito. Sem prazo, sem cobrança automática. Só começa a pagar se decidir assinar." },
  { q: "A IA pode errar na extração?", a: "O sistema foi treinado nos principais modelos de DRE brasileiros e tem uma precisão altíssima. Em casos onde o PDF tem formatação muito atípica, o sistema sinaliza para revisão manual." },
]

export default function FAQ() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" style={{ padding: "100px var(--px)", background: "var(--s1)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: isMobile ? "3rem" : "6rem", alignItems: "start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>FAQ</div>
          <h2 style={{ fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Perguntas<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>frequentes.</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {ITEMS.map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--bd)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", padding: "1.25rem 0",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 500, color: "var(--t1)", lineHeight: 1.4 }}>{item.q}</span>
                {open === i ? <Minus size={16} color="var(--t3)" style={{ flexShrink: 0 }} /> : <Plus size={16} color="var(--t3)" style={{ flexShrink: 0 }} />}
              </button>
              <div style={{
                overflow: "hidden",
                maxHeight: open === i ? "200px" : "0",
                transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}>
                <div style={{ paddingBottom: "1.25rem", fontSize: 14, color: "var(--t2)", lineHeight: 1.75 }}>
                  {item.a}
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--bd)" }} />
        </div>
      </div>
    </section>
  )
}
