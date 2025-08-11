import Image from "next/image";
import Hero from "@/components/Hero";
import Guide from "@/components/Footer";
import GetApp from "@/components/GetApp";
import Features from "@/components/Features";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Hero></Hero>
    <Features></Features>
    <Membership></Membership>
    <Footer></Footer>
    </>
  );
}
