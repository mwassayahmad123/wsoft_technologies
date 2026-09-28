import { contactInfo } from "@/data/content";
import { WhatsAppIcon } from "./ContactIcons";

export default function WhatsAppFloat() {
  return (
    <a
      href={contactInfo.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 transition-transform duration-300 hover:scale-110"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
