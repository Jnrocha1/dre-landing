"use client"
import { motion } from "framer-motion"
import { useIsMobile } from "@/lib/use-is-mobile"
import NotebookMockup from "@/components/NotebookMockup"
import { trackEvent, generateEventId } from "@/lib/meta-pixel"

export default function Hero() {
  const isMobile = useIsMobile()

  return (
    <section className="hero-min-h" style={{
      position: "relative",
      overflowX: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: isMobile ? "center" : "flex-start",
      // justifyContent:center — a coluna de texto sozinha (sem o notebook, que no
      // desktop é position:absolute e sai do fluxo) não preenchia a altura da section
      // (min-height:100vh), ficando colada no topo e deixando um vão vazio embaixo à
      // esquerda. Centralizando verticalmente ela alinha com o notebook (que já é
      // centralizado via top:50%) e fecha esse buraco.
      justifyContent: "center",
      // O recuo esquerdo volta a usar var(--px) puro (agora recalibrado globalmente em
      // globals.css pra 1320px) em vez de uma fórmula local — assim Nav, Hero e as
      // outras seções ficam sempre alinhados na mesma borda esquerda. A versão anterior
      // com fórmula própria só no Hero desalinhou o header, que continuou com a margem
      // antiga (mais larga) e ficou "flutuando" fora de eixo com o headline.
      padding: isMobile
        ? "calc(var(--nav) + 2rem) var(--px) 3rem"
        : "calc(var(--nav) + 3rem) 1.5rem 3rem var(--px)",
    }}>
      {/* Fundo — glow duplo (azul no headline + verde de contraste) + halo colorido atrás
          do notebook + grid pontilhado + hexágonos + linha de tendência. Primeira versão
          disso saiu opaca demais (glow a 9%, traço de hexágono sub-pixel) e o resultado
          ficou "chapado" perto da referência (que usa glow quente cobrindo a página toda +
          losangos bem visíveis + foto vibrante). Esta versão sobe a intensidade pra ficar
          perceptível a olho nu, sem virar ruído sobre o texto. */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 1100px 750px at 34% 18%, rgba(37,99,235,0.22) 0%, transparent 68%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 700px 500px at 92% 78%, rgba(0,214,143,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* glow verde no canto inferior-esquerdo — equilibra na diagonal o azul do canto
          superior-direito e evita que a metade de baixo à esquerda (onde o texto não
          preenche, mesmo centralizado) fique sem nenhuma atmosfera */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: "radial-gradient(ellipse 650px 500px at 6% 96%, rgba(0,214,143,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      {/* halo atrás do notebook — no mockup em si (alumínio/preto) não tem muita cor própria,
          então sem isso ele "flutua" numa área morta de preto chapado; o halo dá presença e
          amarra a cor de marca no elemento visual principal do hero, papel equivalente ao da
          foto saturada na referência */}
      {!isMobile && (
        <div className="hero-glow-breathe" style={{
          position: "absolute", zIndex: 0,
          top: "50%", right: "2vw",
          width: "46vw", height: "62vh",
          transform: "translateY(-50%)",
          background: "radial-gradient(ellipse, rgba(37,99,235,0.30) 0%, rgba(0,214,143,0.10) 45%, transparent 72%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: "radial-gradient(rgba(230,232,237,0.14) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
        maskImage: "radial-gradient(ellipse 90% 85% at 50% 15%, black 0%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 85% at 50% 15%, black 0%, transparent 80%)",
        pointerEvents: "none",
      }} />
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, zIndex: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <defs>
          <linearGradient id="heroLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--blue-l)" />
            <stop offset="100%" stopColor="var(--green)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="var(--blue-l)" strokeLinejoin="round">
          {/* hexágonos contornados, ecoando o "D" da marca sem repetir o mesmo losango da
              referência de construtora — espalhados no quadrante superior direito, um deles
              propositalmente cortado pela borda (como os diamantes da referência que sangram
              pra fora do viewport, dando sensação de escala/profundidade) */}
          <path d="M0,-1 L0.866,-0.5 L0.866,0.5 L0,1 L-0.866,0.5 L-0.866,-0.5 Z" transform="translate(1160,70) scale(140) rotate(12)" strokeWidth="0.028" opacity="0.30" />
          <path d="M0,-1 L0.866,-0.5 L0.866,0.5 L0,1 L-0.866,0.5 L-0.866,-0.5 Z" transform="translate(950,260) scale(46) rotate(-8)" strokeWidth="0.045" opacity="0.26" />
          <path d="M0,-1 L0.866,-0.5 L0.866,0.5 L0,1 L-0.866,0.5 L-0.866,-0.5 Z" transform="translate(1040,60) scale(30) rotate(20)" strokeWidth="0.06" opacity="0.30" />
          <path d="M0,-1 L0.866,-0.5 L0.866,0.5 L0,1 L-0.866,0.5 L-0.866,-0.5 Z" transform="translate(110,120) scale(40) rotate(-15)" strokeWidth="0.045" opacity="0.22" />
          <path d="M0,-1 L0.866,-0.5 L0.866,0.5 L0,1 L-0.866,0.5 L-0.866,-0.5 Z" transform="translate(190,700) scale(32) rotate(8)" strokeWidth="0.05" opacity="0.20" />
          <path d="M0,-1 L0.866,-0.5 L0.866,0.5 L0,1 L-0.866,0.5 L-0.866,-0.5 Z" transform="translate(20,800) scale(90) rotate(-10)" strokeWidth="0.025" opacity="0.16" stroke="var(--green)" />
        </g>
        {/* linha de tendência cruzando o fundo, com nós nos vértices — sparkline atrás do
            hero, deslocada mais pra direita (fora da faixa que o scrim de legibilidade
            escurece por cima do texto) pra não ficar apagada */}
        <polyline
          points="260,620 460,560 620,600 780,460 940,500 1080,300 1220,340"
          fill="none" stroke="url(#heroLineGrad)" strokeWidth="2.5" opacity="0.4"
          strokeLinecap="round" strokeLinejoin="round"
        />
        {[[460,560],[620,600],[780,460],[940,500],[1080,300]].map(([cx,cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" fill="var(--green)" opacity="0.45" />
        ))}
      </svg>

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
        // -9vw -> -14vw: empurra o notebook mais pra fora da borda direita, abrindo
        // respiro real entre ele e a coluna de texto (que também recuou, ver padding
        // da section acima) — os dois eram calibrados quase colados um no outro.
        right: isMobile ? undefined : "-14vw",
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
          {/* Alvo é a TELA do dashboard ficar CENTRALIZADA (margens esquerda/direita iguais).
              HISTÓRICO: havia mesmo um problema real de medição — o motion.div acima (que
              anima opacity/x/y no mount) fica com a animação congelada quando a aba/iframe
              de teste não tem foco do SO (rAF pausado pelo browser), preso no estado
              `initial`. O detalhe traiçoeiro é que esse `initial` é escolhido por isMobile
              no momento do PRIMEIRO render — como isMobile começa false (useState) e só vira
              true depois via useEffect, a animação pode congelar travada no valor de
              DESKTOP (x:60), mesmo num viewport mobile, adicionando um offset horizontal
              fantasma de +60px que contaminou tanto a tentativa -10.775% (derivada por
              álgebra, sem esse problema) quanto as calibrações anteriores -15%/-16% (que
              foram medidas ao vivo, mas sem essa correção — o offset fantasma cancelava por
              coincidência a diferença real, fazendo -16% parecer certo quando não era).
              Medição correta: forçar motionDiv para o estado `animate` estável
              (opacity:1, transform:none) antes de medir, eliminando a dependência de foco/
              rAF. Com isso, tanto a álgebra quanto a medição ao vivo convergem pro mesmo
              valor: t = -8.15% dá margens iguais nos dois breakpoints testados (390px:
              32.9px/32.9px · 414px: 35.0px/35.0px, medido via getBoundingClientRect nos 4
              cantos SCREEN de NotebookMockup.tsx). */}
          {/* Flutuação contínua só no desktop, aplicada aqui (não no motion.div pai, nem
              junto do translateX mobile) — este div não tem nenhum transform estático no
              desktop, então a animação CSS de transform não briga com nada. No mobile ele
              já carrega o translateX(-8.15%) fixo da centralização, então não recebe a
              classe (senão a keyframe substituiria esse translateX a cada frame). */}
          <div className={isMobile ? undefined : "notebook-float"} style={{ transform: isMobile ? "translateX(-8.15%)" : undefined }}>
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
        // 44rem -> 40rem: um pouco mais estreita, pra terminar mais longe do notebook
        // (que também foi deslocado mais pra direita) em vez de esticar até quase
        // encostar nele.
        maxWidth: isMobile ? undefined : "40rem",
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
          <a href="https://app.dreanalytics.com.br/cadastro" className="btn-lift"
            onClick={() => trackEvent('Lead', undefined, generateEventId())}
            style={{
              padding: "14px 32px", borderRadius: 8,
              background: "var(--blue)", color: "#fff",
              fontSize: 15, fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 24px rgba(37,99,235,0.45)",
              width: isMobile ? "100%" : undefined,
              textAlign: "center",
            }}>
            Testar grátis: 3 DREs em 3 dias
          </a>
          <a href="#como-funciona" className="btn-lift"
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
          {["3 DREs grátis por 3 dias", "Sem cartão de crédito", "Cancele quando quiser"].map(t => (
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
