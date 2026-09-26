import { ContactModal } from "@/components/home/modals/contact-modal";
import { redirect } from "next/navigation";

export default function ContactPage() {
  redirect("/");
}
/* export default function ContactPage() {
  return (
    <main className="bg-s">
      <ContactModal />
    </main>
  );
} */
