export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        gap: "1.5rem",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo-dre-full.png" alt="DRE Analytics" style={{ height: 40, width: "auto", marginBottom: 8 }} />

      <p
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(72px, 14vw, 128px)",
          lineHeight: 1,
          color: "var(--blue)",
          letterSpacing: "-0.02em",
        }}
      >
        404
      </p>

      <div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--t1)", marginBottom: 8 }}>
          Essa página não existe
        </h1>
        <p style={{ fontSize: 15, color: "var(--t2)", maxWidth: 420 }}>
          O link pode estar quebrado ou a página foi movida. Volte para o início e siga por lá.
        </p>
      </div>

      <a
        href="/"
        style={{
          padding: "11px 24px",
          borderRadius: 8,
          background: "var(--blue)",
          color: "#fff",
          fontSize: 14,
          fontWeight: 700,
          textDecoration: "none",
          boxShadow: "0 2px 12px rgba(37,99,235,0.4)",
        }}
      >
        ← Voltar para o início
      </a>
    </div>
  )
}
