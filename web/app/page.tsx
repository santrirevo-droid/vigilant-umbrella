import Hero from "@/components/Hero";
import OpeningQuote from "@/components/OpeningQuote";
import CoupleProfile from "@/components/CoupleProfile";
import Countdown from "@/components/Countdown";
import Event from "@/components/Event";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Gift from "@/components/Gift";
import Wishes from "@/components/Wishes";
import Footer from "@/components/Footer";
import { couple } from "@/lib/weddingData";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <OpeningQuote />

      <CoupleProfile
        id="bride"
        eyebrow="Mempelai Wanita"
        name={couple.bride.name}
        role={couple.bride.role}
        father={couple.bride.father}
        mother={couple.bride.mother}
        instagram={couple.bride.instagram}
        floralSide="left"
      />
      <CoupleProfile
        id="groom"
        eyebrow="Mempelai Pria"
        name={couple.groom.name}
        role={couple.groom.role}
        father={couple.groom.father}
        mother={couple.groom.mother}
        instagram={couple.groom.instagram}
        floralSide="right"
      />

      <Countdown />
      <Event />
      <Gallery />
      <RSVP />
      <Gift />
      <Wishes />
      <Footer />
    </main>
  );
}
