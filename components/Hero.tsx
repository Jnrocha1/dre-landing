"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"
import NotebookMockup from "@/components/NotebookMockup"

export default function Hero() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <section className="hero-min-h" style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        padding: "calc(var(--nav) + 2rem) var(--px) 3rem",
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

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{
            position: "relative", zIndex: 1,
            fontSize: "clamp(2.4rem, 11vw, 3.5rem)",
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

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
          style={{
            position: "relative", zIndex: 1,
            fontSize: 15,
            color: "var(--t2)",
            maxWidth: "46ch",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          IA que transforma DREs em dashboards completos, alertas inteligentes e resumos executivos — antes do cliente terminar de perguntar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }}
          style={{
            position: "relative", zIndex: 1,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem",
            width: "100%",
          }}
        >
          <a href="https://dre-analytics-app.vercel.app/cadastro"
            style={{
              padding: "14px 32px", borderRadius: 8,
              background: "var(--blue)", color: "#fff",
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 24px rgba(37,99,235,0.45)",
              width: "100%", textAlign: "center",
            }}>
            Testar grátis — 3 DREs sem cartão
          </a>
          <a href="#como-funciona"
            style={{
              padding: "14px 24px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--bd2)",
              color: "var(--t2)", fontSize: 15, fontWeight: 500, textDecoration: "none",
              width: "100%", textAlign: "center",
            }}>
            Ver como funciona
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            position: "relative", zIndex: 1,
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "1rem",
            flexWrap: "wrap",
            fontSize: 12, color: "var(--t3)",
            marginBottom: "3rem",
          }}
        >
          {["3 DREs gratuitas", "Sem cartão de crédito", "Cancele quando quiser"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t}
            </span>
          ))}
        </motion.div>

        {/* NOTEBOOK MOCKUP — abaixo do texto, sem sobreposição no mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22,1,0.36,1] }}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: 460,
            marginTop: "2rem",
          }}
        >
          <NotebookMockup />
        </motion.div>
      </section>
    )
  }

  return (
    <section className="hero-min-h" style={{
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Fundo sutil — linha da logo */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 900px 600px at 50% 30%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* NOTEBOOK — camada de fundo, grande, deslocado à direita, sangrando pra fora da viewport */}
      <div style={{
        position: "absolute",
        top: "50%", right: "-9vw",
        transform: "translateY(-50%)",
        width: "80vw",
        zIndex: 1,
        pointerEvents: "none",
      }}>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: [0.22,1,0.36,1] }}
        >
          <NotebookMockup />
        </motion.div>
      </div>

      {/* Scrim de legibilidade — funcional, não decorativo: garante contraste do texto sobre o vídeo em movimento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: "absolute", inset: 0, zIndex: 2,
          background: "linear-gradient(90deg, var(--ink) 0%, var(--ink) 32%, rgba(11,15,20,0.92) 42%, rgba(11,15,20,0.62) 52%, rgba(11,15,20,0.22) 63%, transparent 74%)",
          pointerEvents: "none",
        }}
      />

      {/* COLUNA DE TEXTO — alinhada à esquerda, por cima de tudo.
          position:absolute com top/bottom:0 (em vez de height:100%) porque a section
          só tem min-height — uma altura percentual não resolveria de forma confiável. */}
      <div style={{
        position: "absolute", zIndex: 3,
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex", flexDirection: "column",
        alignItems: "flex-start", textAlign: "left",
        maxWidth: "44rem",
        // flex-start (não "center") de propósito: com o notebook gigante e o texto mais alto,
        // centralizar verticalmente poderia empurrar o topo do texto pra trás do nav fixo em
        // viewports mais baixos — mesma causa raiz corrigida no mobile no commit b89eee1.
        justifyContent: "flex-start",
        paddingTop: "calc(var(--nav) + 3rem)",
        paddingBottom: "3rem",
        paddingLeft: "var(--px)",
        paddingRight: "1.5rem",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          style={{ marginBottom: "1.5rem" }}
        >
          <span style={{
            fontSize: 12, fontWeight: 600, color: "var(--t3)",
            textTransform: "uppercase", letterSpacing: "0.12em",
          }}>
            Inteligência financeira para contadores
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22,1,0.36,1] }}
          style={{
            fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--t1)",
            maxWidth: "20ch",
            margin: "0 0 1.25rem",
          }}
        >
          Upload da DRE.{" "}
          <span style={{ color: "var(--blue)" }}>Inteligência</span>{" "}
          em segundos.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22,1,0.36,1] }}
          style={{
            fontSize: 17,
            color: "var(--t2)",
            maxWidth: "46ch",
            margin: "0 0 2.5rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          IA que transforma DREs em dashboards completos, alertas inteligentes e resumos executivos — antes do cliente terminar de perguntar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }}
          style={{
            display: "flex", flexDirection: "row",
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
              textAlign: "center",
            }}>
            Testar grátis — 3 DREs sem cartão
          </a>
          <a href="#como-funciona"
            style={{
              padding: "14px 24px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--bd2)",
              color: "var(--t2)", fontSize: 15, fontWeight: 500, textDecoration: "none",
              textAlign: "center",
            }}>
            Ver como funciona
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            display: "flex", alignItems: "center", justifyContent: "flex-start",
            gap: "1.5rem",
            flexWrap: "wrap",
            fontSize: 12, color: "var(--t3)",
          }}
        >
          {["3 DREs gratuitas", "Sem cartão de crédito", "Cancele quando quiser"].map(t => (
            <span key={t} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
