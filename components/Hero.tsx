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
          pra fora da viewport); no mobile vira uma "janela" de altura limitada (maxHeight
          em vh + overflow:hidden) com o notebook ampliado bem além dela — a tela (que ocupa
          só os ~65% de cima da imagem) fica de fora do corte, e o que sobra (base/teclado)
          é o que é cortado. width:100vw + marginLeft de breakout ignora o padding da
          section, senão a sangria lateral ficaria presa ao content-box em vez da viewport. */}
      <div style={{
        position: isMobile ? "relative" : "absolute",
        top: isMobile ? undefined : "50%",
        right: isMobile ? undefined : "-9vw",
        transform: isMobile ? undefined : "translateY(-50%)",
        width: isMobile ? "100vw" : "80vw",
        marginLeft: isMobile ? "calc(50% - 50vw)" : undefined,
        // reset global `* { max-width:100% }` (globals.css), que senão prende a
        // largura ao content-box do flex item e mata a sangria lateral no mobile.
        maxWidth: isMobile ? "none" : undefined,
        maxHeight: isMobile ? "58vh" : undefined,
        overflow: isMobile ? "hidden" : undefined,
        display: isMobile ? "flex" : undefined,
        justifyContent: isMobile ? "center" : undefined,
        alignItems: isMobile ? "flex-start" : undefined,
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
            width: isMobile ? "230vw" : undefined,
            maxWidth: isMobile ? "none" : undefined,
            flexShrink: isMobile ? 0 : undefined,
          }}
        >
          {/* Wrapper estático separado do motion.div de propósito: framer-motion gera seu
              próprio transform via `animate`, que colidiria com um transform estático no
              mesmo elemento. A imagem do notebook tem uma margem vazia acima do objeto
              antes da tela começar — desloca pra cima pra pular essa margem, senão o
              maxHeight do crop corta a tela em vez do teclado. Ponto mais alto real da tela
              é SCREEN.tr.y≈12.6% (NotebookMockup.tsx). A primeira tentativa usou -10% (só
              2,6% de folga — medido ao vivo em produção via devtools: sobravam ~13px de
              margem antes do corte, insuficiente na prática, tela ainda cortava). Subindo
              pra -20% dá ~7,4% de folga (~38px), com margem de sobra also no fundo (a base/
              teclado ainda cabe tranquilamente dentro do maxHeight do crop). */}
          <div style={{ transform: isMobile ? "translateY(-20%)" : undefined }}>
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
