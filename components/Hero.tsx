"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"
import NotebookMockup from "@/components/NotebookMockup"

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

      {/* NOTEBOOK MOCKUP — render 3D com vídeo real do dashboard, estilo Apple: solto no fundo, bastante espaço negativo ao redor */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22,1,0.36,1] }}
        style={{
          position: "relative", zIndex: 1,
          width: "100%", maxWidth: isMobile ? 400 : 760,
          marginTop: isMobile ? "2rem" : "3rem",
        }}
      >
        <NotebookMockup />
      </motion.div>
    </section>
  )
}
