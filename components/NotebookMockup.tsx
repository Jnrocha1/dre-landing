"use client"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

/**
 * Cantos da tela calibrados visualmente contra public/notebook-mockup-cutout.png
 * (% da largura/altura da imagem). Ajustar aqui se o asset do mockup mudar.
 */
const SCREEN = {
  tl: { x: 41.3, y: 15.3 },
  tr: { x: 79.4, y: 11.5 },
  br: { x: 77.0, y: 64.9 },
  bl: { x: 36.2, y: 60.4 },
}

interface Pt { x: number; y: number }

/**
 * Resolve a matriz projetiva (homografia) que mapeia o retângulo (0,0)-(w,h)
 * de um elemento para o quadrilátero de destino (em pixels, mesmo espaço do container),
 * e devolve como CSS matrix3d — técnica clássica de Heckbert para content-to-quad warp.
 */
function quadMatrix3d(w: number, h: number, tl: Pt, tr: Pt, br: Pt, bl: Pt): string {
  const [x0, y0] = [tl.x, tl.y]
  const [x1, y1] = [tr.x, tr.y]
  const [x2, y2] = [br.x, br.y]
  const [x3, y3] = [bl.x, bl.y]

  const dx1 = x1 - x2, dy1 = y1 - y2
  const dx2 = x3 - x2, dy2 = y3 - y2
  const dx3 = x0 - x1 + x2 - x3
  const dy3 = y0 - y1 + y2 - y3

  const denom = dx1 * dy2 - dx2 * dy1
  const g = denom !== 0 ? (dx3 * dy2 - dx2 * dy3) / denom : 0
  const hh = denom !== 0 ? (dx1 * dy3 - dx3 * dy1) / denom : 0

  const a = x1 - x0 + g * x1
  const b = x3 - x0 + hh * x3
  const c = x0
  const d = y1 - y0 + g * y1
  const e = y3 - y0 + hh * y3
  const f = y0

  // Divide pelas dimensões reais do elemento pra mapear a partir do retângulo em pixels (não do quadrado unitário)
  const A = a / w, B = b / h
  const D = d / w, E = e / h
  const G = g / w, H = hh / h

  return `matrix3d(${A},${D},0,${G}, ${B},${E},0,${H}, 0,0,1,0, ${c},${f},0,1)`
}

interface NotebookMockupProps {
  imageSrc?: string
  videoSrc?: string
}

export default function NotebookMockup({
  imageSrc = "/notebook-mockup-cutout.png",
  videoSrc = "/dashboard-demo.mp4",
}: NotebookMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    // Leitura síncrona imediata — não depende do ResizeObserver disparar
    // (em alguns ambientes de automação/headless o callback nunca chega a rodar).
    const rect = el.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) setSize({ w: rect.width, h: rect.height })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) setSize({ w: rect.width, h: rect.height })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const tl = { x: (SCREEN.tl.x / 100) * size.w, y: (SCREEN.tl.y / 100) * size.h }
  const tr = { x: (SCREEN.tr.x / 100) * size.w, y: (SCREEN.tr.y / 100) * size.h }
  const br = { x: (SCREEN.br.x / 100) * size.w, y: (SCREEN.br.y / 100) * size.h }
  const bl = { x: (SCREEN.bl.x / 100) * size.w, y: (SCREEN.bl.y / 100) * size.h }

  const matrix = size.w > 0 && size.h > 0 ? quadMatrix3d(size.w, size.h, tl, tr, br, bl) : undefined

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1.75", // 5376 x 3072
        overflow: "visible",
      }}
    >
      {/* Sombra de contato — discreta, só pra ancorar o notebook no espaço, sem "chão" nem brilho colorido */}
      <div style={{
        position: "absolute",
        left: "50%", bottom: "6%",
        transform: "translateX(-50%)",
        width: "55%", height: "10%",
        background: "radial-gradient(ellipse, rgba(0,0,0,0.35) 0%, transparent 72%)",
        filter: "blur(14px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt="Dashboard DRE Analytics em notebook"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", zIndex: 1 }}
      />

      {matrix && (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.w,
            height: size.h,
            objectFit: "cover",
            transform: matrix,
            transformOrigin: "0 0",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  )
}
