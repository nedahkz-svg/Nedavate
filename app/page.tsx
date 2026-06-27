import { Nav } from "@/components/Nav";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Hero } from "@/components/Hero";
import { UspBand } from "@/components/UspBand";
import { Services } from "@/components/Services";
import { HowIHelp } from "@/components/HowIHelp";
import { Portfolio } from "@/components/Portfolio";
import { LeadMagnet } from "@/components/LeadMagnet";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <UspBand />
        <Services />
        <HowIHelp />
        <Portfolio />
        <LeadMagnet />
        <Testimonials />
        <About />
        <Booking />
        <FinalCta />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
