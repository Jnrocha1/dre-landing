"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"

export default function CtaFinal() {
  const isMobile = useIsMobile()
  return (
    <section style={{ textAlign: "center", padding: "clamp(60px, 10vw, 100px) var(--px)", background: "linear-gradient(180deg, var(--ink), var(--s1))" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 700, color: "var(--blue-l, #5e78ff)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", justifyContent: "center" }}>
          <span style={{ width: 16, height: 2, background: "var(--blue)", borderRadius: 1, display: "inline-block" }} />
          Comece agora
        </div>
        <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 7vw, 4rem)", lineHeight: 0.96, letterSpacing: "-0.03em", marginBottom: "1rem" }}>
          Seu próximo cliente<br />vai perguntar como<br />você faz <span style={{ color: "var(--green)" }}>tão rápido</span>
        </h2>
        <p style={{ fontSize: "1.05rem", color: "var(--t2)", marginBottom: "2.25rem" }}>3 DREs gratuitas. Sem cartão de crédito. Sem configuração.</p>
        <motion.a
          href="https://dre-analytics-app.vercel.app/cadastro"
          whileHover={{ scale: 1.04, y: -3 }}
          style={{ padding: "17px 42px", borderRadius: 10, background: "var(--blue)", color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: isMobile ? "100%" : undefined, maxWidth: isMobile ? 400 : undefined, margin: isMobile ? "0 auto" : undefined, boxShadow: "0 8px 28px rgba(37,99,235,0.4)" }}
        >
          Criar conta grátis — começa agora
        </motion.a>
      </motion.div>
    </section>
  )
}
