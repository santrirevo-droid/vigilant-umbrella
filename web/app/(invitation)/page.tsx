import Divider from "@/components/Divider";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Gift from "@/components/Gift";
import Hero from "@/components/Hero";
import Mempelai from "@/components/Mempelai";
import OpeningQuote from "@/components/OpeningQuote";
import Wishes from "@/components/Wishes";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <OpeningQuote />
      <Divider className="py-2" />
      <Mempelai />
      <Divider className="py-2" />
      <Gallery />
      <Divider className="py-2" />
      <Wishes />
      <Divider className="py-2" />
      <Gift />
      <Divider className="py-2" />
      <Footer />
    </main>
  );
}
