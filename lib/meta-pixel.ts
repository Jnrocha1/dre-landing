// Wrapper fino em cima do window.fbq (Meta Pixel) — nunca deixa o site quebrar se o Pixel ainda
// não carregou (bloqueador de anúncio, script ainda em voo, ou NEXT_PUBLIC_META_PIXEL_ID nem
// configurado ainda). Toda chamada de tracking do site passa por aqui em vez de chamar
// window.fbq direto, então esse é o único lugar que precisa saber lidar com a ausência do pixel.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

/** Gera um ID de evento estável pra deduplicar entre o Pixel (navegador) e a Conversions API
 *  (servidor) quando o mesmo evento lógico é enviado pelos dois caminhos — ver lib/meta-capi.ts
 *  no app principal. Usa crypto.randomUUID quando disponível (todo navegador atual tem). */
export function generateEventId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

interface TrackOptions {
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
}

/** Dispara um evento padrão do Meta Pixel (Lead, InitiateCheckout, CompleteRegistration, etc).
 *  `eventId` é o mesmo ID usado do lado servidor (Conversions API) pra esse evento não contar
 *  em dobro no Gerenciador de Eventos. Silenciosamente não faz nada se o pixel não estiver
 *  carregado — tracking nunca deve impedir a navegação/conversão real do usuário. */
export function trackEvent(eventName: string, options?: TrackOptions, eventId?: string) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  try {
    window.fbq('track', eventName, options ?? {}, eventId ? { eventID: eventId } : undefined)
  } catch {
    // Nunca deixa um erro de tracking quebrar o clique/navegação real do usuário.
  }
}
