"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { contactInfo, navLinks } from "@/data/content";
import { PhoneIcon, WhatsAppIcon } from "./ContactIcons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-8">
        <Logo />
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-base font-medium text-slate-600 transition-colors duration-300 hover:text-slate-900"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <Link
          href="/#contact"
          className="hidden rounded-full bg-slate-900 px-7 py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30 md:inline-block"
        >
          Start a Project
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span className="h-0.5 w-6 bg-slate-900" />
          <span className="h-0.5 w-6 bg-slate-900" />
          <span className="h-0.5 w-6 bg-slate-900" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-700 transition-colors duration-200 hover:bg-sky-50 hover:text-sky-600"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-slate-900 px-5 py-3 text-center text-base font-semibold text-white transition-colors duration-300 hover:bg-sky-600"
            >
              Start a Project
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a
                href={contactInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-400 hover:text-sky-600"
              >
                <PhoneIcon className="h-4 w-4" />
                Call Us
              </a>
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe5b]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
