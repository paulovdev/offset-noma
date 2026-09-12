"use client";

import { useRouter } from "next/navigation";
import ContactModal from "@/components/home/modals/contact-modal";

export default function ContactModalRoute() {
  const router = useRouter();

  return <ContactModal onCompleteClose={() => router.back()} />;
}
