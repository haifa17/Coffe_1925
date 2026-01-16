import Image from "next/image";
import { translations, type Language } from "@/lib/translations";

interface FooterProps {
  language?: Language;
}

export function Footer({ language = "en" }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="py-20 text-center border-t border-border/50 bg-muted/30">
      <div className="w-20 h-20 mx-auto mb-5 relative opacity-50">
        <Image
          src="/images/logo.png"
          alt="The 1925"
          fill
          className="object-contain mix-blend-multiply dark:mix-blend-screen dark:invert"
        />
      </div>
      <p className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
        {t.tagline}
      </p>
      <p className="text-[9px] tracking-wider text-muted-foreground/60 mt-3">
        © 2025 The 1925
      </p>
    </footer>
  );
}