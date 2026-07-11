import Nav from "@/components/Nav"
import Hero from "@/components/Hero"
import UploadDemo from "@/components/UploadDemo"
import DashboardScroll from "@/components/DashboardScroll"
import Problema from "@/components/Problema"
import ComoFunciona from "@/components/ComoFunciona"
import Recursos from "@/components/Recursos"
import Depoimentos from "@/components/Depoimentos"
import Precos from "@/components/Precos"
import CtaFinal from "@/components/CtaFinal"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <UploadDemo />
      <DashboardScroll />
      <Problema />
      <ComoFunciona />
      <Recursos />
      <Depoimentos />
      <Precos />
      <CtaFinal />
      <Footer />
    </main>
  )
}
