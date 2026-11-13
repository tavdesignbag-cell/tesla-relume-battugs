"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-10 flex h-[72px] items-center bg-white px-5 lg:px-16">
      <div className="flex w-full items-center gap-8">
        <div className="flex flex-1 basis-0 items-center">
          <Logo />
        </div>

        <nav
          id="nav-links"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-[72px] flex-col items-start gap-4 border-b border-border bg-white px-5 pt-4 pb-6 lg:static lg:flex lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:bg-transparent lg:p-0 xl:gap-8`}
        >
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:opacity-70">
              {link.label}
            </a>
          ))}
          <button type="button" aria-expanded="false" className="inline-flex items-center gap-1 hover:opacity-70">
            Дэлгүүр <img src="/assets/chevron-down.svg" alt="" width={24} height={24} />
          </button>
        </nav>

        <div className="flex flex-none items-center justify-end gap-4 lg:flex-1 lg:basis-0">
          <Button size="sm">Туршиж унах</Button>
          <button
            type="button"
            aria-label="Цэс"
            aria-controls="nav-links"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-8 flex-col justify-center gap-[5px] lg:hidden"
          >
            <span className="block h-0.5 bg-black" />
            <span className="block h-0.5 bg-black" />
            <span className="block h-0.5 bg-black" />
          </button>
        </div>
      </div>
    </header>
  );
}
