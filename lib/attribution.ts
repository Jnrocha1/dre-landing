// Captura de atribuição de marketing (UTM + fbclid/gclid) num cookie de primeira parte,
// compartilhado entre dreanalytics.com.br (esta landing) e app.dreanalytics.com.br (o produto)
// via domain=.dreanalytics.com.br — assim, quando o cadastro acontece no app (subdomínio
// diferente), ainda dá pra saber de qual campanha/anúncio aquele lead veio, mesmo a decisão de
// compra acontecendo minutos ou dias depois, em outra aba/sessão.
//
// É "first touch": se o cookie já existe, não sobrescreve — a primeira campanha que trouxe a
// pessoa continua recebendo o crédito, mesmo que ela volte depois por outro canal (ex: clicou
// no anúncio, saiu, voltou digitando o site direto). Isso é uma escolha deliberada de modelo de
// atribuição (não a única correta, mas a mais simples e a que a maioria dos gestores de tráfego
// espera por padrão).

const COOKIE_NAME = 'dre_attrib'
const COOKIE_DOMAIN = '.dreanalytics.com.br'
const MAX_AGE_DAYS = 90

export interface Attribution {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  fbclid?: string
  gclid?: string
  landing_page?: string
  first_seen_at?: string
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string) {
  const maxAge = MAX_AGE_DAYS * 24 * 60 * 60
  // domain=.dreanalytics.com.br só funciona de verdade em produção (nos dois subdomínios reais).
  // Em localhost/preview da Vercel isso falha silenciosamente e o navegador só grava o cookie
  // scoped ao host atual — sem problema, é só que a atribuição não atravessa domínio nesses casos.
  const isProd = typeof window !== 'undefined' && window.location.hostname.endsWith('dreanalytics.com.br')
  const domainPart = isProd ? `; domain=${COOKIE_DOMAIN}` : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}${domainPart}; SameSite=Lax`
}

/** Roda uma vez por carregamento de página (ver components/AttributionCapture.tsx). Lê os
 *  parâmetros de UTM/fbclid/gclid da URL atual e grava no cookie compartilhado, só se ainda não
 *  existir nenhuma atribuição salva (first touch). */
export function captureAttribution() {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const hasNewParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid']
    .some(k => params.has(k))

  const existing = getCookie(COOKIE_NAME)
  if (existing && !hasNewParams) return // já tem atribuição e essa visita não trouxe parâmetro novo

  if (existing && hasNewParams) {
    // Já existe uma atribuição salva, mas essa URL também tem UTM/fbclid — mantém first-touch
    // (não sobrescreve). Se no futuro quiser "last touch", é aqui que se troca a lógica.
    return
  }

  const attrib: Attribution = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
    fbclid: params.get('fbclid') ?? undefined,
    gclid: params.get('gclid') ?? undefined,
    landing_page: window.location.pathname,
    first_seen_at: new Date().toISOString(),
  }

  // Só grava se pelo menos um campo real veio preenchido — não faz sentido persistir um objeto
  // totalmente vazio pra uma visita orgânica direta sem nenhum parâmetro de campanha.
  const temAlgumValor = Object.entries(attrib).some(([k, v]) => k !== 'landing_page' && k !== 'first_seen_at' && v)
  if (!temAlgumValor) return

  setCookie(COOKIE_NAME, JSON.stringify(attrib))
}

/** Anexa o link de destino (ex: cadastro no app) com o plano escolhido — usado pelos botões de
 *  plano pago em Precos.tsx. A atribuição em si (UTM/fbclid) já viaja pelo cookie compartilhado,
 *  não precisa ir na URL. */
export function withPlano(url: string, plano: string): string {
  const u = new URL(url)
  u.searchParams.set('plano', plano)
  return u.toString()
}
