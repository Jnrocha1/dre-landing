"use client"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"

type Tab = "Visão Geral" | "Custos e Margens" | "Alertas"
const TABS: Tab[] = ["Visão Geral", "Custos e Margens", "Alertas"]

// Dados fictícios
const KPIS = [
  { label:"Receita Bruta", value:"R$28,4M", delta:"▼ 8%", dc:"var(--red)" },
  { label:"Rec. Líquida", value:"R$18,6M", delta:"▼ 6%", dc:"var(--red)" },
  { label:"Lucro Bruto", value:"R$2,9M", delta:"▲ 4%", dc:"var(--green)" },
  { label:"Resultado", value:"-R$3,2M", delta:"▲ Melhora", dc:"var(--green)" },
  { label:"Margem Bruta", value:"10,2%", delta:"Bench:22%", dc:"var(--amber)" },
]

const HEATMAP = [
  { name:"Alfa Matriz", vals:["18%","20%","21%","22%","28%"], types:["g2","g2","g2","g2","g3"] },
  { name:"Alfa Atacado", vals:["-6%","-2%","-5%","-3%","-5%"], types:["r2","r1","r2","r1","r2"] },
  { name:"Alfa Shopping", vals:["12%","14%","18%","22%","25%"], types:["g1","g1","g2","g3","g3"] },
  { name:"Alfa Norte", vals:["19%","21%","17%","20%","21%"], types:["g2","g2","g1","g2","g2"] },
]
const HC:Record<string,string> = { g3:"rgba(0,214,143,.32)",g2:"rgba(0,214,143,.16)",g1:"rgba(0,214,143,.07)",r2:"rgba(255,61,87,.22)",r1:"rgba(255,61,87,.1)" }
const HT:Record<string,string> = { g3:"#00a870",g2:"#00b880",g1:"#009060",r2:"var(--red)",r1:"var(--red)" }

const ALERTS = [
  { t:"r", title:"CMV crítico — Alfa Atacado", body:"CMV consome 94% da receita líquida. Renegociação urgente com fornecedores." },
  { t:"a", title:"Cobertura de juros — grupo", body:"Lucro bruto cobre 0,9× das despesas financeiras. Reestruturação recomendada." },
  { t:"g", title:"Tendência positiva — Alfa Shopping", body:"Margem sobe há 4 meses. Melhor performance do grupo." },
  { t:"r", title:"Concentração de clientes — NovaTech", body:"2 clientes = 67% do faturamento. Risco de volatilidade alta." },
]
const AC:Record<string,{bg:string,bd:string,c:string}> = {
  r:{bg:"rgba(255,61,87,.08)",bd:"var(--red)",c:"#ff8898"},
  a:{bg:"rgba(240,165,0,.08)",bd:"var(--amber)",c:"#ffca6a"},
  g:{bg:"rgba(0,214,143,.08)",bd:"var(--green)",c:"#40ffa0"},
}

function fade(p:number, start:number, end:number) {
  return Math.max(0, Math.min(1, (p - start) / (end - start)))
}

function VisaoGeral({ p }: { p: number }) {
  const kpi = fade(p,0,0.2)
  const bar = fade(p,0.18,0.38)
  const line = fade(p,0.32,0.52)
  const hm = fade(p,0.48,0.68)
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"0.6rem",overflow:"hidden"}}>
      {/* KPIs */}
      <div style={{opacity:kpi,transform:`translateY(${(1-kpi)*14}px)`,transition:"none",display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5}}>
        {KPIS.map(k=>(
          <div key={k.label} style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:7,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:4}}>{k.label}</div>
            <div style={{fontSize:13,fontWeight:700,color:"var(--t1)",marginBottom:2}}>{k.value}</div>
            <div style={{fontSize:8,color:k.dc}}>{k.delta}</div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
        <div style={{opacity:bar,transform:`translateY(${(1-bar)*14}px)`,transition:"none",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:10}}>
          <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Receita vs resultado mensal</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:3,height:55}}>
            {[72,88,78,68,60].map((h,i)=>(
              <div key={i} style={{flex:1,height:`${h}%`,background:"rgba(37,99,235,0.65)",borderRadius:"2px 2px 0 0",
                transform:`scaleY(${bar})`,transformOrigin:"bottom",transition:`transform 0.5s ease ${i*0.06}s`}} />
            ))}
            {[13,17,15,11,9].map((h,i)=>(
              <div key={i+5} style={{flex:1,height:`${h}%`,background:"rgba(255,61,87,0.55)",borderRadius:"2px 2px 0 0",
                transform:`scaleY(${bar})`,transformOrigin:"bottom",transition:`transform 0.5s ease ${i*0.06+0.3}s`}} />
            ))}
          </div>
        </div>
        <div style={{opacity:line,transition:"none",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:10}}>
          <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Margem bruta % — tendência</div>
          <svg viewBox="0 0 110 50" style={{width:"100%",height:47}} preserveAspectRatio="none">
            <defs><linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f0a500" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#f0a500" stopOpacity="0"/>
            </linearGradient></defs>
            <path d="M0,42 L22,38 L44,34 L66,29 L88,24 L110,20" stroke="#f0a500" strokeWidth="1.5" fill="none" strokeLinecap="round"
              style={{strokeDasharray:200,strokeDashoffset:200*(1-line),transition:"stroke-dashoffset 1.2s ease"}} />
            <path d="M0,42 L22,38 L44,34 L66,29 L88,24 L110,20 L110,50 L0,50Z" fill="url(#lg1)" opacity={line} />
            <path d="M0,16 L22,18 L44,17 L66,15 L88,18 L110,20" stroke="#ff3d57" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3,2"
              style={{strokeDashoffset:200*(1-Math.max(0,line-0.2)),transition:"stroke-dashoffset 1s ease 0.3s"}} />
          </svg>
        </div>
      </div>
      {/* Heatmap */}
      <div style={{opacity:hm,transform:`translateY(${(1-hm)*14}px)`,transition:"none",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:10}}>
        <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>Heatmap — Margem bruta por empresa/mês</div>
        <div style={{display:"grid",gridTemplateColumns:"65px repeat(5,1fr)",gap:2}}>
          <div />{["Jan","Fev","Mar","Abr","Mai"].map(m=><div key={m} style={{fontSize:7,color:"var(--t3)",textAlign:"center",padding:2}}>{m}</div>)}
          {HEATMAP.map(row=>[
            <div key={row.name+"l"} style={{fontSize:8,color:"var(--t3)",display:"flex",alignItems:"center",padding:2}}>{row.name}</div>,
            ...row.vals.map((v,i)=>(
              <div key={row.name+i} style={{padding:3,borderRadius:3,textAlign:"center",fontWeight:700,fontSize:7.5,
                background:HC[row.types[i]],color:HT[row.types[i]],
                opacity:hm,transition:`opacity 0.4s ease ${i*0.06+0.2}s`}}>{v}</div>
            ))
          ])}
        </div>
      </div>
    </div>
  )
}

function CustosMargens({ p }: { p: number }) {
  const t1 = fade(p,0,0.25)
  const t2 = fade(p,0.22,0.47)
  const t3 = fade(p,0.44,0.69)
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
      {/* Tabela */}
      <div style={{opacity:t1,transform:`translateY(${(1-t1)*14}px)`,transition:"none",background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:10}}>
        <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Análise de custos e margens — Jan a Mai 2026</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr repeat(5,70px)",gap:2,fontSize:8}}>
          {["Linha","Jan","Fev","Mar","Abr","Mai"].map(h=>(
            <div key={h} style={{color:"var(--t3)",padding:"3px 6px",fontWeight:700,textTransform:"uppercase",fontSize:7}}>{h}</div>
          ))}
          {[
            {label:"Receita Bruta",vals:["R$5,1M","R$6,2M","R$5,8M","R$5,6M","R$5,7M"],c:"var(--t1)",bold:true},
            {label:"CMV",vals:["(R$4,0M)","(R$4,8M)","(R$4,4M)","(R$4,0M)","(R$3,8M)"],c:"var(--red)",bold:false},
            {label:"Lucro Bruto",vals:["R$1,1M","R$1,4M","R$1,4M","R$1,6M","R$1,9M"],c:"var(--green)",bold:true},
            {label:"CMV / Rec.",vals:["79%","77%","75%","72%","67%"],c:"var(--amber)",bold:false},
            {label:"Margem Bruta",vals:["21%","23%","25%","28%","33%"],c:"var(--green)",bold:false},
          ].map(row=>[
            <div key={row.label} style={{color:"var(--t1)",padding:"4px 6px",fontWeight:row.bold?700:400,fontSize:9,display:"flex",alignItems:"center"}}>{row.label}</div>,
            ...row.vals.map((v,i)=>(
              <div key={row.label+i} style={{color:row.c,padding:"4px 6px",textAlign:"right",fontWeight:row.bold?700:400,fontSize:9,
                background:i===4?"rgba(0,214,143,0.05)":"transparent",borderRadius:3}}>{v}</div>
            ))
          ])}
        </div>
      </div>
      {/* Gráficos */}
      <div style={{opacity:t2,transform:`translateY(${(1-t2)*14}px)`,transition:"none",display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
        <div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:10}}>
          <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>CMV vs Receita — evolução</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:4,height:55}}>
            {[79,77,75,72,67].map((h,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%"}}>
                <div style={{width:"100%",flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end"}}>
                  <div style={{width:"100%",height:`${h}%`,background:"rgba(255,61,87,0.55)",borderRadius:"2px 2px 0 0",
                    transform:`scaleY(${t2})`,transformOrigin:"bottom",transition:`transform 0.5s ease ${i*0.07}s`}} />
                </div>
                <div style={{fontSize:7,color:"var(--t3)",marginTop:2}}>{["Jan","Fev","Mar","Abr","Mai"][i]}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:10}}>
          <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:8}}>Margem bruta % — crescimento</div>
          <svg viewBox="0 0 110 50" style={{width:"100%",height:47}} preserveAspectRatio="none">
            <defs><linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d68f" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="#00d68f" stopOpacity="0"/>
            </linearGradient></defs>
            <path d="M0,39 L22,35 L44,31 L66,24 L88,17 L110,10" stroke="#00d68f" strokeWidth="1.5" fill="none" strokeLinecap="round"
              style={{strokeDasharray:200,strokeDashoffset:200*(1-t2),transition:"stroke-dashoffset 1.2s ease"}} />
            <path d="M0,39 L22,35 L44,31 L66,24 L88,17 L110,10 L110,50 L0,50Z" fill="url(#lg2)" opacity={t2} />
            {[0,22,44,66,88,110].map((x,i)=>{
              const ys=[39,35,31,24,17,10]
              const ls=["21%","23%","25%","28%","33%","33%"]
              return <text key={i} x={x} y={ys[i]-4} fontSize="6.5" fill="#00d68f" textAnchor="middle" opacity={t2}>{ls[i]}</text>
            })}
          </svg>
        </div>
      </div>
      {/* Alertas de custos */}
      <div style={{opacity:t3,transform:`translateY(${(1-t3)*14}px)`,transition:"none",display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
        <div style={{padding:"10px 12px",background:"rgba(240,165,0,.08)",borderRadius:8,borderLeft:"2px solid var(--amber)",fontSize:10,color:"#ffca6a"}}>
          <strong style={{display:"block",marginBottom:2}}>CMV médio: 74% da Rec. Líquida</strong>
          Acima de 70%. Há espaço para negociação com fornecedores.
        </div>
        <div style={{padding:"10px 12px",background:"rgba(0,214,143,.08)",borderRadius:8,borderLeft:"2px solid var(--green)",fontSize:10,color:"#40ffa0"}}>
          <strong style={{display:"block",marginBottom:2}}>✓ Margem em melhora consistente</strong>
          Evolução de +12pp em 5 meses. Tendência favorável.
        </div>
      </div>
    </div>
  )
}

function Alertas({ p }: { p: number }) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
        <div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:12,display:"flex",alignItems:"center",gap:12,
          opacity:fade(p,0,0.2),transition:"none"}}>
          <div style={{width:52,height:52,borderRadius:"50%",border:"3px solid var(--amber)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:700,color:"var(--amber)",flexShrink:0}}>34</div>
          <div>
            <div style={{fontSize:11,fontWeight:700,color:"var(--t1)",marginBottom:2}}>Score de Saúde — Crítico</div>
            <div style={{fontSize:9,color:"var(--t3)"}}>Baseado em CMV, resultado, margens e tendência</div>
          </div>
        </div>
        <div style={{background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:8,padding:12,
          opacity:fade(p,0.05,0.25),transition:"none"}}>
          <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>Resumo</div>
          <div style={{display:"flex",gap:12}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:"var(--red)"}}>2</div><div style={{fontSize:8,color:"var(--t3)"}}>Críticos</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:"var(--amber)"}}>1</div><div style={{fontSize:8,color:"var(--t3)"}}>Atenção</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:700,color:"var(--green)"}}>1</div><div style={{fontSize:8,color:"var(--t3)"}}>Positivo</div></div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {ALERTS.map((a,i)=>{
          const c=AC[a.t]
          const op=fade(p, i*0.14, i*0.14+0.22)
          return (
            <div key={a.title} style={{padding:"10px 12px",borderRadius:8,borderLeft:`3px solid ${c.bd}`,background:c.bg,color:c.c,fontSize:10,lineHeight:1.5,
              opacity:op,transform:`translateX(${(1-op)*-10}px)`,transition:"none"}}>
              <strong style={{display:"block",fontWeight:700,marginBottom:2}}>{a.title}</strong>
              {a.body}
            </div>
          )
        })}
      </div>
      <div style={{background:"linear-gradient(135deg,rgba(37,99,235,0.08),rgba(0,214,143,0.04))",
        border:"1px solid rgba(37,99,235,0.2)",borderRadius:8,padding:12,
        opacity:fade(p,0.55,0.75),transition:"none"}}>
        <div style={{fontSize:8,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6}}>✦ Resumo executivo por IA</div>
        <p style={{fontSize:10,color:"var(--t2)",lineHeight:1.75,borderLeft:"2px solid var(--blue)",paddingLeft:8}}>
          "O Grupo Alfa Comércio apresenta dois desafios estruturais: CMV médio de 84% nas unidades de atacado e cobertura de juros de 0,9× no consolidado. A Alfa Shopping é a única com tendência positiva consistente — subindo de 12% para 25% de margem em 5 meses. Recomendo priorizar a renegociação de fornecedores no atacado e revisão do mix de produtos das demais unidades."
        </p>
      </div>
    </div>
  )
}

export default function DashboardScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const [activeTab, setActiveTab] = useState<Tab>("Visão Geral")
  const [tabProgress, setTabProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    return smooth.on("change", (v) => {
      if (v < 0.33) {
        setActiveTab("Visão Geral")
        setTabProgress(v / 0.33)
      } else if (v < 0.66) {
        setActiveTab("Custos e Margens")
        setTabProgress((v - 0.33) / 0.33)
      } else {
        setActiveTab("Alertas")
        setTabProgress((v - 0.66) / 0.34)
      }
    })
  }, [smooth])

  const sidebarItems = ["Consolidado","Alfa Matriz","Alfa Shopping","Alfa Norte","Alfa Sul","Alfa Atacado","Alfa Online","Alfa Prime"]

  return (
    <div ref={containerRef} style={{ height: "280vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 64,
        height: "calc(100vh - 64px)",
        display: "flex", alignItems: "center",
        padding: `0.75rem ${isMobile ? "1rem" : "max(1rem, calc((100vw - 1160px)/2))"}`,
        overflow: "hidden",
      }}>
        <div style={{
          width: "100%", height: "100%",
          background: "var(--s1)",
          border: "1px solid var(--bd2)",
          borderRadius: isMobile ? 14 : 20,
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          display: "flex", flexDirection: "column",
        }}>
          {/* Barra de título */}
          <div style={{padding:"10px 14px",background:"var(--s2)",borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
            {["#ff5f57","#ffbd2e","#28c840"].map(c=><div key={c} style={{width:11,height:11,borderRadius:"50%",background:c}} />)}
            <span style={{fontSize:11,color:"var(--t3)",margin:"0 auto",letterSpacing:"0.04em"}}>
              DRE Analytics — Grupo Alfa Comércio · Jan–Mai 2026
            </span>
          </div>

          {/* Abas */}
          <div style={{padding:"0 14px",background:"var(--s2)",borderBottom:"1px solid var(--bd)",display:"flex",gap:2,flexShrink:0,overflowX:"auto"}}>
            {TABS.map(tab=>(
              <div key={tab} style={{
                padding:"8px 14px",fontSize:isMobile?10:11,fontWeight:600,cursor:"default",whiteSpace:"nowrap",
                color:activeTab===tab?"var(--t1)":"var(--t3)",
                borderBottom:`2px solid ${activeTab===tab?"var(--blue)":"transparent"}`,
                transition:"color 0.3s, border-color 0.3s",
              }}>{tab}</div>
            ))}
            <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:8}}>
              <div style={{width:60,height:2,background:"rgba(255,255,255,0.06)",borderRadius:1,overflow:"hidden"}}>
                <div style={{height:"100%",background:"var(--blue)",width:`${tabProgress*100}%`,transition:"none",borderRadius:1}} />
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{flex:1,display:"grid",gridTemplateColumns:isMobile?"1fr":"140px 1fr",overflow:"hidden"}}>
            {/* Sidebar — esconde em mobile */}
            {!isMobile && (
              <div style={{borderRight:"1px solid var(--bd)",padding:"0.65rem",display:"flex",flexDirection:"column",gap:2,overflowY:"auto"}}>
                <div style={{fontSize:7.5,color:"var(--t3)",textTransform:"uppercase",letterSpacing:"0.08em",padding:"4px 8px 2px"}}>Empresas</div>
                {sidebarItems.map((n,i)=>(
                  <div key={n} style={{padding:"6px 8px",borderRadius:7,fontSize:9.5,color:i===0?"#6B9FFF":"var(--t3)",background:i===0?"rgba(37,99,235,0.12)":"transparent",display:"flex",alignItems:"center",gap:6}}>
                    <div style={{width:4,height:4,borderRadius:"50%",background:i===0?"var(--blue)":"currentColor",opacity:i===0?1:0.4,flexShrink:0}} />
                    {n}
                    {i===0 && <span style={{marginLeft:"auto",background:"var(--red)",color:"#fff",fontSize:8,fontWeight:700,padding:"1px 4px",borderRadius:3}}>8</span>}
                  </div>
                ))}
                <div style={{marginTop:"0.5rem",padding:"6px 8px"}}>
                  <div style={{background:"rgba(255,61,87,.1)",borderRadius:7,padding:"6px 8px"}}>
                    <div style={{color:"var(--red)",fontWeight:700,fontSize:14}}>34</div>
                    <div style={{color:"var(--t3)",fontSize:7.5}}>Score médio</div>
                  </div>
                </div>
              </div>
            )}

            {/* Conteúdo */}
            <div style={{padding:isMobile?"0.6rem":"0.75rem",overflowY:"auto",overflowX:"hidden"}}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8,marginBottom:"0.6rem",flexWrap:"wrap"}}>
                <div>
                  <div style={{fontSize:isMobile?11:12,fontWeight:700,color:"var(--t1)"}}>Grupo Alfa Comércio — {activeTab}</div>
                  <div style={{fontSize:9,color:"var(--t3)",marginTop:1}}>Jan–Mai 2026 · 8 empresas · R$28,4M receita</div>
                </div>
                <div style={{display:"flex",gap:4,flexShrink:0}}>
                  <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:4,background:"rgba(255,61,87,0.12)",color:"var(--red)"}}>▼ R$3,2M</span>
                  <span style={{fontSize:9,fontWeight:700,padding:"2px 7px",borderRadius:4,background:"rgba(240,165,0,0.12)",color:"var(--amber)"}}>CMV 84%</span>
                </div>
              </div>

              {activeTab === "Visão Geral" && <VisaoGeral p={tabProgress} />}
              {activeTab === "Custos e Margens" && <CustosMargens p={tabProgress} />}
              {activeTab === "Alertas" && <Alertas p={tabProgress} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
