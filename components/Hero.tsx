"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: `calc(var(--nav) + ${isMobile ? "3rem" : "4rem"}) var(--px) ${isMobile ? "3rem" : "5rem"}`,
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Fundo sutil — linha da logo */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 900px 600px at 50% 30%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
        style={{ position: "relative", zIndex: 1, marginBottom: "1.5rem" }}
      >
        <span style={{
          fontSize: 12, fontWeight: 600, color: "var(--t3)",
          textTransform: "uppercase", letterSpacing: "0.12em",
        }}>
          Inteligência financeira para contadores
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
        style={{
          position: "relative", zIndex: 1,
          fontSize: isMobile ? "clamp(2.4rem, 11vw, 3.5rem)" : "clamp(3rem, 6vw, 5.5rem)",
          fontWeight: 700,
          letterSpacing: "-0.035em",
          lineHeight: 1.05,
          color: "var(--t1)",
          maxWidth: "14ch",
          margin: "0 auto 1.25rem",
        }}
      >
        Upload da DRE.{" "}
        <span style={{ color: "var(--blue)" }}>Inteligência</span>{" "}
        em segundos.
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
        style={{
          position: "relative", zIndex: 1,
          fontSize: isMobile ? 15 : 17,
          color: "var(--t2)",
          maxWidth: "46ch",
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        IA que transforma DREs em dashboards completos, alertas inteligentes e resumos executivos — antes do cliente terminar de perguntar.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }}
        style={{
          position: "relative", zIndex: 1,
          display: "flex", flexDirection: isMobile ? "column" : "row",
          alignItems: "center", gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <a href="https://dre-analytics-app.vercel.app/cadastro"
          style={{
            padding: "14px 32px", borderRadius: 8,
            background: "var(--blue)", color: "#fff",
            fontSize: 15, fontWeight: 700, textDecoration: "none",
            boxShadow: "0 4px 24px rgba(37,99,235,0.45)",
            width: isMobile ? "100%" : "auto", textAlign: "center",
          }}>
          Testar grátis — 3 DREs sem cartão
        </a>
        <a href="#como-funciona"
          style={{
            padding: "14px 24px", borderRadius: 8,
            background: "transparent", border: "1px solid var(--bd2)",
            color: "var(--t2)", fontSize: 15, fontWeight: 500, textDecoration: "none",
            width: isMobile ? "100%" : "auto", textAlign: "center",
          }}>
          Ver como funciona
        </a>
      </motion.div>

      {/* Trust */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: isMobile ? "1rem" : "1.5rem",
          flexWrap: "wrap",
          fontSize: 12, color: "var(--t3)",
          marginBottom: isMobile ? "3rem" : "5rem",
        }}
      >
        {["3 DREs gratuitas", "Sem cartão de crédito", "Cancele quando quiser"].map(t => (
          <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            {t}
          </span>
        ))}
      </motion.div>

      {/* NOTEBOOK MOCKUP */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22,1,0.36,1] }}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: isMobile ? "100%" : 860,
          perspective: "1200px",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)",
          width: "60%", height: 60,
          background: "radial-gradient(ellipse, rgba(37,99,235,0.4) 0%, transparent 70%)",
          filter: "blur(20px)", pointerEvents: "none",
        }} />

        {/* Tampa/Lid do notebook — a tela */}
        <div style={{
          width: "100%",
          background: "linear-gradient(160deg, #2a2d3e 0%, #1a1d2e 40%, #141620 100%)",
          borderRadius: "14px 14px 0 0",
          border: "1.5px solid rgba(255,255,255,0.13)",
          borderBottom: "none",
          padding: "clamp(8px,1.5vw,14px) clamp(8px,1.5vw,14px) 0",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 0 60px rgba(0,0,0,0.3)",
          position: "relative",
        }}>
          {/* Webcam */}
          <div style={{
            position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
            width: 7, height: 7, borderRadius: "50%",
            background: "#0a0c14", border: "1px solid rgba(255,255,255,0.08)",
            zIndex: 3,
          }}>
            <div style={{ width: 3, height: 3, borderRadius: "50%", background: "#1a2a1a", margin: "2px auto" }} />
          </div>

          {/* Tela — aspect ratio 16:10 */}
          <div style={{
            width: "100%",
            paddingBottom: "62.5%",
            position: "relative",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            background: "#0B0F14",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "#0B0F14",
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}>
              {/* Barra de título do app */}
              <div style={{
                padding: "8px 14px",
                background: "#0d1119",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", gap: 10,
                flexShrink: 0,
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  {["#ff5f57","#ffbd2e","#28c840"].map(c => (
                    <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.04)", padding: "2px 16px", borderRadius: 4 }}>
                    dre-analytics-app.vercel.app
                  </div>
                </div>
              </div>

              {/* App layout */}
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "160px 1fr", overflow: "hidden" }}>
                {/* Sidebar */}
                <div style={{ background: "#0d1119", borderRight: "1px solid rgba(255,255,255,0.05)", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 8px 8px" }}>DRE Analytics</div>
                  {[
                    { l: "Visão Geral", active: true },
                    { l: "An. Vertical", active: false },
                    { l: "Custos", active: false },
                    { l: "Alertas 🔴", active: false },
                    { l: "C-Level", active: false },
                  ].map(item => (
                    <div key={item.l} style={{
                      padding: "6px 10px", borderRadius: 6, fontSize: 10,
                      color: item.active ? "#fff" : "rgba(255,255,255,0.3)",
                      background: item.active ? "rgba(37,99,235,0.2)" : "transparent",
                      fontWeight: item.active ? 600 : 400,
                    }}>
                      {item.l}
                    </div>
                  ))}
                  <div style={{ marginTop: "auto", padding: "8px 10px" }}>
                    <div style={{ background: "rgba(255,61,87,0.1)", borderRadius: 6, padding: "6px 8px" }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#FF3D57" }}>34</div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)" }}>Score crítico</div>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>NovaTech Serviços</div>
                      <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>Jan–Abr 2026 · Visão Geral</div>
                    </div>
                    <div style={{ fontSize: 9, padding: "3px 8px", background: "rgba(0,214,143,0.12)", color: "#00D68F", borderRadius: 4, fontWeight: 700 }}>
                      ▲ +18,4%
                    </div>
                  </div>

                  {/* KPI grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>
                    {[
                      { l: "Receita", v: "R$1,64M", d: "+18,4%", p: true },
                      { l: "Margem", v: "44,2%", d: "+6,2pp", p: true },
                      { l: "EBITDA", v: "R$204K", d: "+31,7%", p: true },
                      { l: "Score", v: "72/100", d: "Saudável", p: true },
                    ].map(k => (
                      <div key={k.l} style={{ background: "#111620", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, padding: "6px 8px" }}>
                        <div style={{ fontSize: 7, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>{k.l}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#F0F2F5", marginBottom: 2 }}>{k.v}</div>
                        <div style={{ fontSize: 8, color: k.p ? "#00D68F" : "#FF3D57" }}>{k.d}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart area */}
                  <div style={{ flex: 1, background: "#111620", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 6, padding: "8px", display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
                    <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Receita e resultado — mensal</div>
                    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 4 }}>
                      {[
                        { rec: 62, res: 10 },
                        { rec: 78, res: 16 },
                        { rec: 70, res: 24 },
                        { rec: 92, res: 32 },
                      ].map((d, i) => (
                        <div key={i} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", gap: 2 }}>
                          <div style={{ flex: 3, height: `${d.rec}%`, background: "rgba(37,99,235,0.65)", borderRadius: "2px 2px 0 0" }} />
                          <div style={{ flex: 1, height: `${d.res}%`, background: "#00D68F", borderRadius: "2px 2px 0 0" }} />
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[["Receita","rgba(37,99,235,0.65)"],["Resultado","#00D68F"]].map(([l,c]) => (
                        <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 7, color: "rgba(255,255,255,0.25)" }}>
                          <div style={{ width: 8, height: 4, borderRadius: 1, background: c as string }} />{l}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alertas */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {[
                      { t: "g", l: "Margem em crescimento — +6,2pp em 4 meses" },
                      { t: "r", l: "CMV elevado — acima do benchmark setorial" },
                    ].map((a, i) => {
                      const c = a.t === "g" ? "#00D68F" : "#FF3D57"
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 7px", background: `${c}10`, borderLeft: `2px solid ${c}`, borderRadius: "0 4px 4px 0" }}>
                          <div style={{ fontSize: 8, color: c, fontWeight: 600 }}>{a.l}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Base do notebook */}
        <div style={{
          width: "100%",
          height: "clamp(14px, 2.5vw, 22px)",
          background: "linear-gradient(180deg, #1e2132 0%, #161824 50%, #0e1018 100%)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          borderTop: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "0 0 8px 8px",
          position: "relative",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 2px 0 rgba(255,255,255,0.05)",
        }}>
          {/* Entalhe trackpad */}
          <div style={{
            position: "absolute", bottom: 3, left: "50%", transform: "translateX(-50%)",
            width: "18%", height: 3,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 2,
          }} />
        </div>

        {/* Sombra na mesa */}
        <div style={{
          width: "85%", height: 16, margin: "0 auto",
          background: "rgba(0,0,0,0.5)",
          filter: "blur(18px)",
          borderRadius: "0 0 50% 50%",
        }} />
      </motion.div>
    </section>
  )
}
