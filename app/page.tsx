import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HomeSections, { HOME_PAGE_METADATA } from "@/components/HomeSections";

export const metadata: Metadata = HOME_PAGE_METADATA;

export default function Home() {
  return (
    <>
      <Hero />
      <HomeSections />
    </>
  );
}
