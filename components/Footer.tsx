export default function Footer() {
  return (
    <footer style={{ padding: "2.5rem max(2rem, calc((100vw - 1160px)/2))", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-dre-full.png" alt="DRE Analytics" style={{ height: 32, width: "auto", objectFit: "contain" }} />
      </a>
      <div style={{ display: "flex", gap: "1.75rem" }}>
        {[["Entrar","https://dre-analytics-app.vercel.app/login"],["Cadastrar","https://dre-analytics-app.vercel.app/cadastro"],["Planos","#planos"]].map(([l,h]) => (
          <a key={l} href={h} style={{ fontSize: 12, color: "var(--t3)", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "var(--t3)" }}>© 2026 DRE Analytics</div>
    </footer>
  )
}
