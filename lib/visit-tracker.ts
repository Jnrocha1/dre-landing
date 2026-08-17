// Contador de visitas próprio (não depende de Vercel Web Analytics nem do Meta) — alimenta o
// funil ao vivo em /admin/trackeamento no app.dreanalytics.com.br. Dedup por dia via localStorage
// (mesmo visitor_id não conta 2x no mesmo dia neste navegador); o servidor também deduplica via
// índice único, então mesmo se o localStorage falhar (aba anônima, cache limpo) não gera contagem
// dobrada — só dobra a chamada de rede, que é best-effort e não afeta nada visível ao usuário.

const VISITOR_ID_KEY = 'dre_visitor_id'
const LAST_VISIT_KEY = 'dre_last_visit_date'
const TRACK_URL = 'https://app.dreanalytics.com.br/api/track-visit'

function getOrCreateVisitorId(): string {
  let id = localStorage.getItem(VISITOR_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(VISITOR_ID_KEY, id)
  }
  return id
}

/** Roda uma vez por carregamento de página (ver components/VisitTracker.tsx). Só dispara a
 *  requisição se ainda não registramos visita HOJE neste navegador. */
export function trackVisit() {
  if (typeof window === 'undefined') return

  const hoje = new Date().toISOString().slice(0, 10)
  if (localStorage.getItem(LAST_VISIT_KEY) === hoje) return
  localStorage.setItem(LAST_VISIT_KEY, hoje)

  const visitorId = getOrCreateVisitorId()
  const params = new URLSearchParams(window.location.search)

  // fetch com keepalive: sobrevive mesmo se a pessoa navegar/fechar a aba logo em seguida — sem
  // isso, em conexões lentas a requisição podia ser cancelada no meio antes de completar.
  fetch(TRACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
    body: JSON.stringify({
      visitorId,
      path: window.location.pathname,
      utm_source: params.get('utm_source') ?? undefined,
      utm_medium: params.get('utm_medium') ?? undefined,
      utm_campaign: params.get('utm_campaign') ?? undefined,
      fbclid: params.get('fbclid') ?? undefined,
    }),
  }).catch(() => {
    // best-effort — se falhar (bloqueador, offline, etc.), simplesmente não conta essa visita.
    // Reverte a marca do dia pra tentar de novo na próxima página vista na mesma sessão.
    localStorage.removeItem(LAST_VISIT_KEY)
  })
}
