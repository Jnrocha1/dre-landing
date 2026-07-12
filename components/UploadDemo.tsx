"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"

const STEPS = [
  { id: "s1", text: "Lendo o PDF...", done: "PDF lido — 31 linhas identificadas" },
  { id: "s2", text: "IA identificando as linhas da DRE...", done: "IA mapeou todos os campos" },
  { id: "s3", text: "Calculando 23 indicadores financeiros...", done: "23 indicadores calculados" },
  { id: "s4", text: "Salvando no dashboard...", done: "Dashboard atualizado" },
]

export default function UploadDemo() {
  const isMobile = useIsMobile()
  const [state, setState] = useState<"idle"|"running"|"done">("idle")
  const [stepIdx, setStepIdx] = useState(-1)
  const [progress, setProgress] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>[]>([])

  function start() {
    if (state === "running") return
    if (state === "done") { setState("idle"); setStepIdx(-1); setProgress(0); return }
    setState("running")
    const delays = [0, 1100, 2300, 3400]
    delays.forEach((d, i) => {
      const t = setTimeout(() => setStepIdx(i), d)
      timer.current.push(t)
    })
    let p = 0
    const iv = setInterval(() => {
      p += 2
      setProgress(Math.min(p, 100))
      if (p >= 100) clearInterval(iv)
    }, 72)
    timer.current.push(setTimeout(() => { setState("done") }, 4800))
  }

  const isDone = state === "done"
  const isRunning = state === "running"

  return (
    <div style={{ padding: "0 clamp(0px, 4vw, 80px) 80px", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "1.5rem" }}>
        Simulação ao vivo
      </p>

      {/* Seta para baixo animada */}
      <div style={{ marginBottom: "1.5rem" }}>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "9px 18px", borderRadius: 99,
            background: "rgba(37,99,235,0.12)", border: "1.5px solid rgba(37,99,235,0.4)",
            fontSize: 13, fontWeight: 600, color: "#6B9FFF",
          }}>
            Clique no card abaixo para simular o processamento
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(37,99,235,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </div>

      {/* Upload Box */}
      <motion.div
        onClick={start}
        whileHover={{ y: -3, boxShadow: "0 20px 50px rgba(37,99,235,0.18)" }}
        style={{
          maxWidth: "min(540px, 92vw)", margin: "0 auto",
          background: isDone ? "rgba(0,214,143,0.04)" : isRunning ? "rgba(37,99,235,0.04)" : "var(--s1)",
          border: `2px ${isRunning || isDone ? "solid" : "dashed"} ${isDone ? "var(--green)" : isRunning ? "var(--blue)" : "rgba(255,255,255,0.12)"}`,
          borderRadius: 20, padding: "2.25rem", cursor: "pointer",
          transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
          userSelect: "none",
        }}
      >
        {/* Ícone */}
        <div style={{
          width: 68, height: 68, borderRadius: 16, margin: "0 auto 1.1rem",
          background: isDone ? "rgba(0,214,143,0.1)" : "rgba(37,99,235,0.1)",
          border: `1px solid ${isDone ? "rgba(0,214,143,0.22)" : "rgba(37,99,235,0.22)"}`,
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
          transition: "all 0.4s",
        }}>
          {isDone ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="9" y1="15" x2="15" y2="15"/>
              <line x1="9" y1="11" x2="15" y2="11"/>
            </svg>
          )}
        </div>

        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--t1)", marginBottom: 3 }}>
          {isDone ? "Análise concluída!" : "DRE_NovaTech_Servicos_Abr2026.pdf"}
        </div>
        <div style={{ fontSize: 13, color: "var(--t2)", marginBottom: isRunning || isDone ? "1rem" : 0 }}>
          {isDone ? "Clique para repetir" : isRunning ? "Processando com IA..." : "Clique aqui para simular o processamento"}
        </div>

        {/* Progress bar */}
        {(isRunning || isDone) && (
          <div style={{ height: 3, background: "var(--s2)", borderRadius: 2, overflow: "hidden", marginBottom: "1rem" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{ height: "100%", background: "linear-gradient(90deg, var(--blue), var(--green))", borderRadius: 2 }}
            />
          </div>
        )}

        {/* Steps */}
        {(isRunning || isDone) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 7, textAlign: "left" }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: i <= stepIdx ? 1 : 0, x: i <= stepIdx ? 0 : -6 }}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  fontSize: 12,
                  color: (isDone || i < stepIdx) ? "var(--green)" : "var(--t2)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke={(isDone || i < stepIdx) ? "var(--green)" : "var(--t2)"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {(isDone || i < stepIdx)
                    ? <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>
                    : <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>
                  }
                </svg>
                {(isDone || i < stepIdx) ? s.done : s.text}
              </motion.div>
            ))}
          </div>
        )}

        {/* Resultado */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ marginTop: "1.25rem", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,214,143,0.18)", background: "var(--s2)", textAlign: "left" }}
            >
              <div style={{ padding: "0.7rem 1rem", background: "rgba(0,214,143,0.07)", borderBottom: "1px solid rgba(0,214,143,0.12)", display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, color: "var(--green)" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Dashboard gerado — NovaTech Serviços · Abril 2026
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
                {[
                  { l: "Receita bruta", v: "R$412K", c: "var(--t1)" },
                  { l: "Lucro bruto", v: "R$186K", c: "var(--green)" },
                  { l: "CMV/Rec.líq", v: "48,2%", c: "var(--red)" },
                  { l: "Margem bruta", v: "45,1%", c: "var(--green)" },
                  { l: "Resultado", v: "R$42K", c: "var(--green)" },
                  { l: "Score saúde", v: "72/100", c: "var(--green)" },
                ].map(k => (
                  <div key={k.l} style={{ padding: "0.65rem 0.9rem", background: "var(--s2)", textAlign: "center" }}>
                    <div style={{ fontSize: 8, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{k.l}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: k.c }}>{k.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ margin: "0.7rem 0.9rem 0.9rem", background: "var(--s3, #181836)", borderRadius: 9, padding: "0.65rem 0.9rem", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--green)", flexShrink: 0 }}>72</div>
                <div style={{ fontSize: 10 }}>
                  <div style={{ fontWeight: 700, color: "var(--t1)", marginBottom: 1 }}>Score de saúde — Saudável</div>
                  <div style={{ color: "var(--t3)" }}>Margem acima do benchmark · Resultado positivo · Tendência favorável</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
