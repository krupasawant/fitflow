import Image from "next/image";
import Hero from "@/components/Hero";
import Guide from "@/components/Footer";
import Features from "@/components/Features";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Hero></Hero>
    <Membership></Membership>
    <Features></Features>
    <Footer></Footer>
    </>
  );
}
