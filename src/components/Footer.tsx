import Logo from "./Logo";
import { contactInfo, navLinks } from "@/data/content";
import { PhoneIcon, WhatsAppIcon } from "./ContactIcons";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm text-slate-400">
              Software, AI agents, and platforms built by a senior engineering
              team that ships.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright &copy; {new Date().getFullYear()} WSOFT Technologies Pvt Ltd.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href={`mailto:${contactInfo.email}`} className="hover:text-slate-300">
              {contactInfo.email}
            </a>
            <a href={contactInfo.phoneHref} className="inline-flex items-center gap-1.5 hover:text-slate-300">
              <PhoneIcon className="h-3.5 w-3.5" />
              {contactInfo.phoneDisplay}
            </a>
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#25D366]"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
