'use client'

import { useEffect } from 'react'
import { trackVisit } from '@/lib/visit-tracker'

/** Componente invisível montado uma vez no layout raiz — registra a visita (1x/dia/navegador) no
 *  contador próprio que alimenta o funil ao vivo do painel admin. Ver lib/visit-tracker.ts. */
export function VisitTracker() {
  useEffect(() => {
    trackVisit()
  }, [])
  return null
}
