"use client";

import { useEffect, useState } from "react";

// Хажуугийн дугаартай цэс. Дэлгэцэн дээр харагдаж буй хэсгийг тодруулна.
export default function StyleguideNav({ items }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const targets = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Styleguide-ийн хэсгүүд">
      <ol className="scrollbar-none flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`flex items-baseline gap-3 rounded-md px-3 py-1.5 text-sm whitespace-nowrap transition-colors duration-150 ${
                  isActive ? "bg-neutral-5 font-semibold" : "hover:bg-neutral-5"
                }`}
              >
                <span className="font-roboto text-xs tabular-nums opacity-50">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
