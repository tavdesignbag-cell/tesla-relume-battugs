// Админ form-уудын нийтлэг style ба сонголтууд
export const inputClass =
  "w-full rounded-md border border-border bg-white px-3 py-2 text-base outline-none transition-colors focus:border-royal-blue focus:ring-2 focus:ring-royal-blue/20";

export const labelClass = "flex flex-col gap-1.5 text-sm font-medium";

export const imageOptions = [
  "/assets/card-model-y.png",
  "/assets/card-placeholder.png",
  "/assets/hero.png",
  "/assets/fsd.png",
  "/assets/offers.png",
];

// Supabase Storage bucket-ийн тохиргоотой ижил байх ёстой
export const IMAGE_BUCKET = "slide-images";
export const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"];
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;

export const logoOptions = ["/assets/partner-logo-1.svg", "/assets/partner-logo-2.svg"];
