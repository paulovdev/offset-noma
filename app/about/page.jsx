"use client";

import { useRouter } from "next/navigation";
import AboutModal from "@/components/home/modals/about-modal";

export default function AboutPage() {
  const router = useRouter();

  return <AboutModal onClose={() => router.back()} />;
}
