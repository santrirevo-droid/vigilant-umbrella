import Acara from "@/components/Acara";
import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import Gift from "@/components/Gift";
import Hero from "@/components/Hero";
import Mempelai from "@/components/Mempelai";
import OpeningQuote from "@/components/OpeningQuote";
import RSVP from "@/components/RSVP";
import Wishes from "@/components/Wishes";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <OpeningQuote />
      <Divider className="py-2" />
      <Mempelai />
      <Divider className="py-2" />
      <Acara />
      <Divider className="py-2" />
      <RSVP />
      <Divider className="py-2" />
      <Gift />
      <Divider className="py-2" />
      <Wishes />
      <Divider className="py-2" />
      <Footer />
    </main>
  );
}
