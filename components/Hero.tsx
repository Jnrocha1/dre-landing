"use client"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function Hero() {
  const isMobile = useIsMobile()
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      paddingTop: "clamp(80px, 15vw, 140px)",
      paddingLeft: "var(--px)",
      paddingRight: "var(--px)",
      paddingBottom: 60,
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      {/* Glow de fundo */}
      <div style={{
        position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)",
        width: 900, height: 600,
        background: "radial-gradient(ellipse, rgba(37,99,235,0.15) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "5px 14px", borderRadius: 99,
          background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.28)",
          fontSize: 11, fontWeight: 700, color: "#6B9FFF",
          letterSpacing: "0.07em", textTransform: "uppercase",
          marginBottom: "1.75rem",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
          IA para contabilidade consultiva
        </div>

        <h1 style={{
          fontWeight: 800,
          fontSize: "clamp(1.9rem, 8vw, 7rem)",
          lineHeight: 0.93, letterSpacing: "-0.03em",
          marginBottom: "1.5rem",
        }}>
          O contador que<br />
          entrega em{" "}
          <span style={{ color: "var(--blue)" }}>8 segundos</span>
          <br />
          <span style={{ color: "var(--green)" }}>ganha o cliente</span>
        </h1>

        <p style={{
          fontSize: "clamp(0.9rem, 3vw, 1.2rem)", color: "var(--t2)",
          maxWidth: "min(520px, 92vw)", margin: "0 auto 2.5rem", lineHeight: 1.75,
        }}>
          Arraste o PDF da DRE. A IA extrai os dados, calcula 23 indicadores
          e gera o dashboard completo — antes do cliente terminar de perguntar.
        </p>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", justifyContent: "center", gap: isMobile ? "10px" : "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <motion.a
            href="https://dre-analytics-app.vercel.app/cadastro"
            whileHover={{ scale: 1.03, y: -2 }}
            style={{
              padding: "15px 34px", borderRadius: 10, background: "var(--blue)", color: "#fff",
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
              width: isMobile ? "100%" : undefined,
              boxShadow: "0 8px 28px rgba(37,99,235,0.35)",
            }}
          >
            Testar grátis — 3 DREs sem cartão
          </motion.a>
          <motion.a
            href="#como-funciona"
            whileHover={{ scale: 1.02 }}
            style={{
              padding: "15px 26px", borderRadius: 10,
              background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--t2)", fontSize: 15, fontWeight: 500, textDecoration: "none",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: isMobile ? "100%" : undefined,
            }}
          >
            Ver como funciona
          </motion.a>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", fontSize: "clamp(11px, 2.5vw, 13px)", color: "var(--t3)", flexWrap: "wrap" }}>
          {["Sem integração com ERP", "Sem configuração técnica", "Qualquer PDF de DRE"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Check size={13} color="var(--green)" />{t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
