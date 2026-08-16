'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/** Componente invisível montado uma vez no layout raiz — só existe pra rodar captureAttribution()
 *  assim que a página carrega, gravando UTM/fbclid num cookie de primeira parte compartilhado
 *  com app.dreanalytics.com.br (ver lib/attribution.ts). */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])
  return null
}
