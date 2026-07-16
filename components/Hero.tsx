"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"
import NotebookMockup from "@/components/NotebookMockup"

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section className="hero-min-h" style={{
      position: "relative",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      padding: isMobile
        ? "calc(var(--nav) + 2rem) var(--px) 3rem"
        : "calc(var(--nav) + 3rem) 1.5rem 3rem var(--px)",
    }}>
      {/* Fundo sutil — linha da logo */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 900px 600px at 50% 30%, rgba(37,99,235,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* NOTEBOOK — no desktop é camada de fundo (absolute, deslocado à direita, sangrando
          pra fora da viewport); no mobile, o notebook é ampliado só HORIZONTALMENTE
          (190vw), nunca cortamos a ALTURA (era isso que causava a tela do dashboard ser
          cortada, incluindo um bug só reproduzível no Safari iOS real). A section já tem
          overflowX:hidden, então o excesso lateral é cortado automaticamente.
          CENTRALIZAÇÃO: não centralizamos a imagem do notebook inteira (seu centro
          geométrico, 50% da largura) — centralizamos o CENTRO DA TELA do dashboard, que
          fica em ~60,75% da largura da imagem (a tela vai de ~41,5% a ~80%, não é simétrica
          em relação ao notebook inteiro por causa da perspectiva). Isso é feito em duas
          etapas: 1) alignItems:"center" da <section> (herdado, não editado aqui) centraliza
          o wrapper width:100vw normalmente — sem marginLeft de breakout, que conflitava com
          essa centralização por flex (bug encontrado e corrigido nesta mudança: o
          marginLeft:calc(50%-50vw) presumia layout de bloco normal, brigando com o
          alignItems:center do flex pai e jogando o notebook ~48px pra esquerda do centro
          real). 2) um translateX(-10.75%) fixo no notebook (wrapper estático separado do
          motion.div, mesma técnica de sempre pra não colidir com o transform do
          framer-motion) desloca a imagem de forma que o centro da TELA, não da imagem,
          fique no centro da viewport. Com isso dá pra sangrar bem mais (190vw) mantendo
          ~7% de margem simétrica dos dois lados da tela, em vez do limite mais apertado que
          uma centralização ingênua permitiria. */}
      <div style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? undefined : "50%",
        right: isMobile ? undefined : "-9vw",
        transform: isMobile ? undefined : "translateY(-50%)",
        width: isMobile ? "100vw" : "80vw",
        // reset global `* { max-width:100% }` (globals.css), que senão prende a
        // largura ao content-box do flex item e mata a sangria lateral no mobile.
        maxWidth: isMobile ? "none" : undefined,
        display: isMobile ? "flex" : undefined,
        justifyContent: isMobile ? "center" : undefined,
        marginTop: isMobile ? "0.5rem" : undefined,
        order: 2,
        zIndex: 1,
        pointerEvents: "none",
      }}>
        {/* Glow ambiente atrás do notebook no mobile — só pra dar sensação de
            profundidade/atmosfera, o notebook boiando sozinho no vazio ficava sem contexto. */}
        {isMobile && (
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%", height: "90%",
            background: "radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, transparent 70%)",
            filter: "blur(20px)",
            zIndex: -1,
          }} />
        )}
        <motion.div
          initial={isMobile ? { opacity: 0, x: 0, y: 40 } : { opacity: 0, x: 60, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: isMobile ? 1.1 : 1.3, delay: isMobile ? 0.5 : 0.4, ease: [0.22,1,0.36,1] }}
          style={{
            width: isMobile ? "190vw" : undefined,
            maxWidth: isMobile ? "none" : undefined,
            flexShrink: isMobile ? 0 : undefined,
          }}
        >
          {/* Alvo é a TELA do dashboard ficar CENTRALIZADA (margens esquerda/direita
              iguais), não só "sem cortar" (margens positivas quaisquer). -15% garantia
              margem positiva nos dois lados mas desigual (+42.5px esq. vs +23.3px dir. em
              390px, quase o dobro) — parecia puxado pra esquerda no print. Recalibrado
              medindo ao vivo (getBoundingClientRect dos 4 cantos SCREEN em
              NotebookMockup.tsx, varrendo valores até L≈R): -16% equilibra os dois
              breakpoints (390px: 35.2px/30.7px · 414px: 33.6px/36.3px — diferença ≤4.5px
              nos dois, ambos bem positivos). Não dá pra zerar a diferença nos dois
              breakpoints ao mesmo tempo com um valor fixo em %, mas -16% é o melhor
              compromisso medido. */}
          <div style={{ transform: isMobile ? "translateX(-16%)" : undefined }}>
            <NotebookMockup />
          </div>
        </motion.div>
      </div>

      {/* Scrim de legibilidade — só no desktop, onde o texto cruza sobre o notebook.
          No mobile não há overlap, então não precisa (e não deveria) existir. */}
      {!isMobile && (
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
      )}

      {/* COLUNA DE TEXTO — position:relative (não mais absolute) pra contribuir com a
          altura da section, que só tem min-height. Se o conteúdo (headline grande + parágrafo
          + CTAs + badges) for mais alto que o min-height, a section cresce naturalmente em vez
          de estourar o fundo e ser cortada pelo overflow. */}
      <div style={{
        position: "relative",
        zIndex: 3,
        display: "flex", flexDirection: "column",
        alignItems: isMobile ? "center" : "flex-start",
        textAlign: isMobile ? "center" : "left",
        maxWidth: isMobile ? undefined : "44rem",
        width: isMobile ? "100%" : undefined,
        order: 1,
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
            fontFamily: "var(--font-display)",
            fontSize: isMobile ? "clamp(2.4rem, 11vw, 3.5rem)" : "clamp(3rem, 5.5vw, 5.5rem)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.05,
            color: "var(--t1)",
            maxWidth: isMobile ? "14ch" : "20ch",
            margin: isMobile ? "0 auto 1.25rem" : "0 0 1.25rem",
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
            fontSize: isMobile ? 15 : 17,
            color: "var(--t2)",
            maxWidth: "46ch",
            margin: isMobile ? "0 auto 2.5rem" : "0 0 2.5rem",
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          IA que transforma DREs em dashboards completos, alertas inteligentes e resumos executivos, antes mesmo do cliente terminar de perguntar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22,1,0.36,1] }}
          style={{
            display: "flex", flexDirection: isMobile ? "column" : "row",
            alignItems: "center", gap: "0.75rem",
            marginBottom: "1.5rem",
            width: isMobile ? "100%" : undefined,
          }}
        >
          <a href="https://dre-analytics-app.vercel.app/cadastro"
            style={{
              padding: "14px 32px", borderRadius: 8,
              background: "var(--blue)", color: "#fff",
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 24px rgba(37,99,235,0.45)",
              width: isMobile ? "100%" : undefined,
              textAlign: "center",
            }}>
            Testar grátis: 3 DREs sem cartão
          </a>
          <a href="#como-funciona"
            style={{
              padding: "14px 24px", borderRadius: 8,
              background: "transparent", border: "1px solid var(--bd2)",
              color: "var(--t2)", fontSize: 15, fontWeight: 500, textDecoration: "none",
              width: isMobile ? "100%" : undefined,
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
            display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start",
            gap: isMobile ? "1rem" : "1.5rem",
            flexWrap: "wrap",
            fontSize: 12, color: "var(--t3)",
            marginBottom: isMobile ? "3rem" : 0,
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
