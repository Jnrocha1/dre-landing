"use client"
import { useIsMobile } from "@/lib/use-is-mobile"
import { useInView } from "@/lib/use-in-view"
import { Check, X } from "lucide-react"
import { trackEvent, generateEventId } from "@/lib/meta-pixel"
import { withPlano } from "@/lib/attribution"

const PLANS = [
  {
    id: "trial", name: "Trial", price: "Grátis", priceNum: 0, per: "3 DREs em 3 dias · sem cartão", popular: false,
    feats: [["1 empresa", true],["3 DREs grátis por 3 dias", true],["Dashboard completo", true],["Consolidado/Comparativo", false],["Histórico ilimitado", false]],
  },
  {
    id: "starter", name: "Starter", price: "R$ 97", priceNum: 97, per: "/mês", popular: false,
    feats: [["Até 5 empresas", true],["DREs ilimitadas", true],["2 anos de histórico", true],["Consolidado/Comparativo", false],["Suporte prioritário", false]],
  },
  {
    id: "pro", name: "Pro", price: "R$ 197", priceNum: 197, per: "/mês", popular: true,
    feats: [["Até 15 empresas", true],["DREs ilimitadas", true],["5 anos de histórico", true],["Consolidado de grupos", true],["Comparativo entre empresas", true]],
  },
  {
    id: "premium", name: "Premium", price: "R$ 297", priceNum: 297, per: "/mês", popular: false,
    feats: [["Até 30 empresas", true],["Histórico ilimitado", true],["Tudo do plano Pro", true],["Suporte prioritário", true],["+R$9/empresa adicional", true]],
  },
]

export default function Precos() {
  const isMobile = useIsMobile()
  const { ref, vis } = useInView()
  return (
    <section id="planos" style={{ padding: "100px var(--px)", background: "var(--ink)", borderTop: "1px solid var(--bd)" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: isMobile ? "clamp(1.8rem,8vw,2.8rem)" : "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Quanto custa continuar<br /><span style={{ color: "var(--t2)", fontWeight: 400 }}>fazendo isso na mão?</span>
        </h2>
        <p style={{ fontSize: 14, color: "var(--t3)", marginTop: "1rem" }}>Cancele quando quiser · Sem fidelidade · Sem taxa de implantação</p>
      </div>

      <div ref={ref} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "1px", background: "var(--bd)", border: "1px solid var(--bd)", borderRadius: 12, overflow: "hidden" }}>
        {PLANS.map((p, i) => (
          <div key={p.name} className="card-hover" style={{
            padding: "1.75rem",
            background: p.popular ? "var(--s2)" : "var(--s1)",
            display: "flex", flexDirection: "column",
            position: "relative",
            opacity: vis ? 1 : 0,
            transform: vis ? "none" : "translateY(16px)",
            // Sem transição inline depois que a entrada já rodou (vis=true) — deixa a
            // classe .card-hover (hover/press) assumir o transition desse ponto em diante.
            // Combinar os dois no mesmo elemento via inline style bagunçava a transição
            // de hover, já que inline sempre tem precedência sobre a classe.
            transition: vis ? undefined : `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
          }}>
            {p.popular && (
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", background: "var(--blue)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 12px", borderRadius: "0 0 6px 6px", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Mais popular
              </div>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", marginTop: p.popular ? "0.75rem" : 0 }}>{p.name}</div>
            <div style={{ fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 700, color: "var(--t1)", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "0.25rem" }}>{p.price}</div>
            <div style={{ fontSize: 12, color: "var(--t3)", marginBottom: "1.5rem" }}>{p.per}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, marginBottom: "1.5rem" }}>
              {p.feats.map(([l, ok]) => (
                <div key={String(l)} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: ok ? "var(--t2)" : "var(--t3)" }}>
                  {ok ? <Check size={13} color="var(--green)" strokeWidth={2.5} /> : <X size={13} color="var(--t3)" strokeWidth={2} />}
                  {l}
                </div>
              ))}
            </div>
            <a
              href={p.id === "trial" ? "https://app.dreanalytics.com.br/cadastro" : withPlano("https://app.dreanalytics.com.br/cadastro", p.id)}
              className="btn-lift"
              onClick={() => {
                if (p.id === "trial") {
                  trackEvent('Lead', undefined, generateEventId())
                } else {
                  // InitiateCheckout: intenção de compra de um plano específico já na landing —
                  // o cadastro em si (CompleteRegistration) e a compra confirmada (Purchase) são
                  // disparados depois, do lado do app (que sabe de verdade se a conta foi criada
                  // e se o pagamento foi confirmado pela Stripe).
                  trackEvent('InitiateCheckout', { value: p.priceNum, currency: 'BRL', content_name: p.name }, generateEventId())
                }
              }}
              style={{
              padding: "11px", borderRadius: 7, textAlign: "center",
              fontSize: 13, fontWeight: 700, textDecoration: "none",
              // Antes o botão secundário (Starter/Premium) usava --t2/--bd2, que rendia quase
              // sem contraste contra o fundo do card (#1F2736 sobre #111620/#181E2A) — lia como
              // desabilitado mesmo sendo 100% clicável. Texto em --t1 (quase branco) + borda mais
              // visível deixa claro que é um botão ativo, só com menos ênfase que o "Mais popular".
              background: p.popular ? "var(--blue)" : "var(--s3)",
              color: p.popular ? "#fff" : "var(--t1)",
              border: p.popular ? "none" : "1px solid rgba(230,232,237,0.3)",
            }}>
              {p.name === "Trial" ? "Começar grátis" : `Assinar ${p.name}`}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
