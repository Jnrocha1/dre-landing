import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import TrustStrip from "@/components/TrustStrip"
import ProductShowcase from "@/components/ProductShowcase"
import ComoFunciona from "@/components/ComoFunciona"
import Recursos from "@/components/Recursos"
import Depoimentos from "@/components/Depoimentos"
import Precos from "@/components/Precos"
import FAQ from "@/components/FAQ"
import CtaFinal from "@/components/CtaFinal"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <TrustStrip />
      <ProductShowcase />
      <ComoFunciona />
      <Recursos />
      <Depoimentos />
      <Precos />
      <FAQ />
      <CtaFinal />
      <Footer />
    </main>
  )
}
