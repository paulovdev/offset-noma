"use client";

import { useRouter } from "next/navigation";
import AboutModal from "@/components/home/modals/about-modal";

export default function AboutModalRoute() {
  const router = useRouter();

  return (
    <>
      <AboutModal onCompleteClose={() => router.back()} />
    </>
  );
}
