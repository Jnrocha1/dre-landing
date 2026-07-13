"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Hero() {
  const isMobile = useIsMobile()
  const [imgError, setImgError] = useState(false)

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
          width: "100%", maxWidth: isMobile ? "100%" : 900,
        }}
      >
        {/* Glow embaixo do notebook */}
        <div style={{
          position: "absolute", bottom: -40, left: "50%", transform: "translateX(-50%)",
          width: "70%", height: 80,
          background: "radial-gradient(ellipse, rgba(37,99,235,0.35) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }} />

        {/* Lid do notebook */}
        <div style={{
          width: "100%",
          background: "linear-gradient(180deg, #1e2030 0%, #161824 100%)",
          borderRadius: "16px 16px 0 0",
          border: "1px solid rgba(255,255,255,0.12)",
          borderBottom: "none",
          padding: "clamp(6px, 1.5vw, 12px) clamp(6px, 1.5vw, 12px) 0",
          boxShadow: "0 -2px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Câmera */}
          <div style={{
            position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
            display: "flex", alignItems: "center", gap: 4, zIndex: 2,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a1c28", border: "1px solid rgba(255,255,255,0.1)" }} />
          </div>

          {/* Tela */}
          <div style={{
            width: "100%",
            paddingBottom: "62.5%", /* 16:10 aspect ratio */
            position: "relative",
            borderRadius: "8px 8px 0 0",
            overflow: "hidden",
            background: "#0B0F14",
          }}>
            {!imgError && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/dashboard-preview.png"
                alt="Dashboard DRE Analytics"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", objectPosition: "top left",
                }}
                onError={() => setImgError(true)}
              />
            )}
            {/* Fallback visual quando não tem screenshot */}
            {imgError && (
              <div style={{
                position: "absolute", inset: 0,
                background: "#0B0F14",
                display: "flex", flexDirection: "column",
              }}>
                {/* Barra de título simulada */}
                <div style={{ padding: "10px 16px", background: "#111620", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--t1)" }}>DRE Analytics</div>
                  <div style={{ marginLeft: "auto", fontSize: 10, color: "var(--t3)" }}>NovaTech Serviços · Abril 2026</div>
                </div>
                {/* KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.06)", margin: "12px 12px 0", borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                  {[
                    { l: "Receita Bruta", v: "R$1,64M", d: "+18,4%", p: true },
                    { l: "Margem Bruta", v: "44,2%", d: "+6,2pp", p: true },
                    { l: "EBITDA", v: "R$204K", d: "+31,7%", p: true },
                    { l: "Score Saúde", v: "72/100", d: "Saudável", p: true },
                  ].map(k => (
                    <div key={k.l} style={{ padding: "10px 12px", background: "#0B0F14" }}>
                      <div style={{ fontSize: 8, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{k.l}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--t1)", marginBottom: 2 }}>{k.v}</div>
                      <div style={{ fontSize: 10, color: k.p ? "var(--green)" : "var(--red)" }}>{k.d}</div>
                    </div>
                  ))}
                </div>
                {/* Chart area */}
                <div style={{ flex: 1, margin: "8px 12px 12px", background: "#111620", borderRadius: 6, border: "1px solid rgba(255,255,255,0.06)", padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6, overflow: "hidden" }}>
                  <div style={{ fontSize: 9, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Receita e Resultado — Jan a Abr 2026</div>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 6 }}>
                    {[
                      { rec: 68, res: 12 },
                      { rec: 82, res: 18 },
                      { rec: 74, res: 27 },
                      { rec: 92, res: 35 },
                    ].map((d, i) => (
                      <div key={i} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", gap: 2 }}>
                        <div style={{ flex: 3, height: `${d.rec}%`, background: "rgba(37,99,235,0.7)", borderRadius: "2px 2px 0 0" }} />
                        <div style={{ flex: 1, height: `${d.res}%`, background: "var(--green)", borderRadius: "2px 2px 0 0" }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Base do notebook */}
        <div style={{
          width: "100%",
          height: "clamp(12px, 2vw, 20px)",
          background: "linear-gradient(180deg, #141620 0%, #0e1018 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
          position: "relative",
        }}>
          {/* Logo da marca no notebook */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(16px, 2vw, 24px)", height: "clamp(16px, 2vw, 24px)",
            opacity: 0.15,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-icon.svg" alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "grayscale(1)" }} />
          </div>
        </div>

        {/* Sombra do notebook na mesa */}
        <div style={{
          width: "90%", height: 20, margin: "0 auto",
          background: "rgba(0,0,0,0.5)",
          filter: "blur(16px)",
          borderRadius: "0 0 50% 50%",
        }} />
      </motion.div>
    </section>
  )
}
