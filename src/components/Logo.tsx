import Image from "next/image";
import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/logo-icon.png"
        alt="Wsoft Technologies"
        width={298}
        height={171}
        priority
        className="h-11 w-auto"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`text-xl font-extrabold tracking-tight ${
            dark ? "text-white" : "text-slate-900"
          }`}
        >
          WSOFT<span className="text-sky-500">.</span>
        </span>
        <span
          className={`text-[10px] font-semibold tracking-[0.3em] ${
            dark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          TECHNOLOGIES
        </span>
      </span>
    </Link>
  );
}
