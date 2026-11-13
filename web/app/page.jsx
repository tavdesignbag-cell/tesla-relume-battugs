import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ChargeHeader from "@/components/sections/ChargeHeader";
import FsdSection from "@/components/sections/FsdSection";
import Hero from "@/components/sections/Hero";
import OffersSection from "@/components/sections/OffersSection";
import StatsSection from "@/components/sections/StatsSection";
import Slider from "@/components/slider/Slider";
import { getSlides } from "@/lib/slides";

export default async function Home() {
  const slides = await getSlides();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FsdSection />
        <Slider title="Машинууд" description="Урт тэнхлэгтэй дунд оврын SUV" slides={slides} />
        <OffersSection />
        <ChargeHeader />
        <StatsSection />
        <Slider title="Бусад бүтээгдэхүүн" description="Урт тэнхлэгтэй дунд оврын SUV" slides={slides} />
      </main>
      <Footer />
    </>
  );
}
