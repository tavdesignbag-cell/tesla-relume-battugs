// /styleguide хуудасны өгөгдөл. Утгууд нь app/globals.css-ийн @theme болон
// components/ доторх Tailwind class-уудаас авсан. Токен өөрчлөгдвөл энд шинэчилнэ.

export const sections = [
  { id: "principles", label: "Зарчим" },
  { id: "brand", label: "Брэнд" },
  { id: "color", label: "Өнгө" },
  { id: "type", label: "Үсэг" },
  { id: "spacing", label: "Зай" },
  { id: "shape", label: "Хэлбэр" },
  { id: "stroke", label: "Шугам" },
  { id: "shade", label: "Сүүдэр, бүрхүүл" },
  { id: "icons", label: "Дүрс, зураг" },
  { id: "components", label: "Компонент" },
  { id: "sections", label: "Хэсгүүд" },
  { id: "motion", label: "Хөдөлгөөн" },
];

export const principles = [
  {
    title: "Цагаан, хар, нэг цэнхэр",
    body: "Цагаан дэвсгэр, хар бичвэр, зөвхөн гол үйлдэлд royal blue. Бусад гадаргуу нь хар өнгийн тунгалаг хувилбар.",
  },
  {
    title: "Нэг гэр бүлийн үсэг",
    body: "Бүх бичвэр, гарчиг Inter. Roboto зөвхөн том тоо болон slide-ийн ишлэлд.",
  },
  {
    title: "Mobile-first, гурван breakpoint",
    body: "Анх утсанд зориулж бичээд xs (481px), lg (992px), xl (1101px)-ээс дээш томруулна.",
  },
  {
    title: "Хурдан, богино хөдөлгөөн",
    body: "Hover 150ms, зөвхөн өнгө, гэрэлтэлт, жижиг scale. Агуулга хэзээ ч хөдөлгөөнийг хүлээхгүй.",
  },
];

export const colors = [
  { token: "--color-white", cls: "bg-white", value: "#ffffff", use: "Хуудасны дэвсгэр, navbar" },
  { token: "--color-black", cls: "bg-black", value: "#000000", use: "Үндсэн бичвэр, гарчиг" },
  { token: "--color-fg", cls: "bg-fg", value: "#f2f2f2", use: "SplitCard, сумтай товчны гадаргуу" },
  { token: "--color-royal-blue", cls: "bg-royal-blue", value: "#4175e5", use: "Гол үйлдлийн товч (primary)" },
  { token: "--color-btn-gray", cls: "bg-btn-gray", value: "#e0e0e0", use: "Саарал товч" },
  { token: "--color-btn-gray-hover", cls: "bg-btn-gray-hover", value: "#cfcfcf", use: "Саарал товчны hover" },
  { token: "--color-arrow-hover", cls: "bg-arrow-hover", value: "#e4e4e4", use: "Сумтай товчны hover" },
  { token: "--color-slide", cls: "bg-slide", value: "#888888", use: "Slide картын зураг ачаалахаас өмнө" },
];

export const alphaColors = [
  { token: "--color-neutral-5", cls: "bg-neutral-5", value: "black · 5%", use: "Secondary товч" },
  { token: "--color-neutral-10", cls: "bg-neutral-10", value: "black · 10%", use: "Secondary товчны hover" },
  { token: "--color-border", cls: "bg-border", value: "black · 15%", use: "Hairline, Stat-ийн зүүн шугам" },
  { token: "--color-overlay", cls: "bg-overlay", value: "black · 40%", use: "Зураг дээрх бичвэрийн бүрхүүл" },
];

export const fontFamilies = [
  {
    name: "Inter",
    role: "Sans",
    cls: "font-sans",
    weights: "400 · 500 · 600",
    use: "Бүх бичвэр, гарчиг, товч, цэс. latin + cyrillic.",
    variable: "--font-inter",
  },
  {
    name: "Roboto",
    role: "Тоо",
    cls: "font-roboto",
    weights: "400 · 700",
    use: "Stat-ийн том тоо (700), slide-ийн ишлэл (400).",
    variable: "--font-roboto-family",
  },
];

export const textStyles = [
  {
    name: "text-h1",
    cls: "text-h1",
    spec: "Inter 500 · 40 → 48 → 72px · 1.2 · -0.01em",
    use: "Hero, хуудасны гол гарчиг",
    sample: "Model 3",
  },
  {
    name: "text-h2",
    cls: "text-h2",
    spec: "Inter 500 · 32 → 40 → 52px · 1.2 · -0.01em",
    use: "Хэсгийн гарчиг (SectionHeading)",
    sample: "Цэнэглэх цэг хайх",
  },
  {
    name: "Stat",
    cls: "font-roboto text-[56px] leading-[1.3] font-bold lg:text-[80px]",
    spec: "Roboto 700 · 56 → 80px · 1.3",
    use: "Том тоон үзүүлэлт",
    sample: "22,593",
  },
  {
    name: "text-h6",
    cls: "text-h6",
    spec: "Inter 500 · 20 → 22px · 1.4 · -0.01em",
    use: "Stat-ийн тайлбар, картын гарчиг",
    sample: "Байршлын цэнэглэгч",
  },
  {
    name: "text-md",
    cls: "text-md",
    spec: "Inter 400 · 18px · 1.5",
    use: "Гарчгийн доорх тайлбар (lead)",
    sample: "Ойролцоох Supercharger болон цэнэглэх цэгүүдийг харах.",
  },
  {
    name: "Tagline",
    cls: "font-semibold",
    spec: "Inter 600 · 16px · 1.5",
    use: "Гарчгийн дээрх жижиг шошго",
    sample: "Цэнэглэлт",
  },
  {
    name: "base",
    cls: "",
    spec: "Inter 400 · 16px · 1.5",
    use: "Үндсэн бичвэр, цэс, товч (500)",
    sample: "Жолоодлогыг хялбар болгоно. Сард $99.",
  },
  {
    name: "text-sm",
    cls: "text-sm",
    spec: "Inter 400/600 · 14px · 1.5",
    use: "Footer-ийн холбоос, жижиг тайлбар",
    sample: "Нууцлал, эрх зүй",
  },
];

export const breakpoints = [
  { name: "base", value: "0–480px", use: "Утас. Бүх style эндээс эхэлнэ." },
  { name: "xs", value: "≥ 481px", use: "Том утас. Гарчиг томорч, товчны padding нэмэгдэнэ." },
  { name: "lg", value: "≥ 992px", use: "Desktop. Navbar бүтэн, SplitCard хоёр багана, padding 64px." },
  { name: "xl", value: "≥ 1101px", use: "Өргөн desktop. Цэсний зай, Stat хэсгийн зай нэмэгдэнэ." },
];

export const spacing = [
  { cls: "gap-1", px: 4 },
  { cls: "gap-2", px: 8 },
  { cls: "gap-4", px: 16 },
  { cls: "gap-6", px: 24 },
  { cls: "gap-8", px: 32 },
  { cls: "gap-12", px: 48 },
  { cls: "gap-16", px: 64 },
  { cls: "gap-20", px: 80 },
  { cls: "py-28", px: 112 },
];

export const layout = [
  { name: "Container", value: "max-w-[1280px]", use: "Агуулгын дээд өргөн" },
  { name: "Gutter", value: "px-5 → lg:px-16", use: "Хажуугийн зай 20px → 64px" },
  { name: "Section", value: "py-16 → lg:py-28", use: "Хэсгийн дээд, доод зай 64px → 112px" },
  { name: "Header", value: "h-[72px]", use: "Navbar-ийн өндөр, бүх дэлгэцэнд ижил" },
  { name: "Content", value: "max-w-[768px]", use: "Гарчиг, тайлбарын дээд өргөн" },
];

export const radii = [
  { name: "0", cls: "rounded-none", use: "Карт, зураг, SplitCard, hero" },
  { name: "rounded", cls: "rounded", value: "4px", use: "Сумтай товч" },
  { name: "rounded-md", cls: "rounded-md", value: "6px", use: "Бүх товч" },
  { name: "rounded-full", cls: "rounded-full", value: "50%", use: "Slider-ийн цэг" },
];

export const icons = [
  { file: "arrow-back.svg", size: 24, use: "Slider · өмнөх" },
  { file: "arrow-forward.svg", size: 24, use: "Slider · дараах" },
  { file: "chevron-right.svg", size: 24, use: "Товч доторх сум" },
  { file: "chevron-down.svg", size: 24, use: "Цэсний dropdown" },
  { file: "play.svg", size: 64, use: "Видео тоглуулах" },
  { file: "tesla-logo.svg", size: 32, use: "Favicon" },
];

export const images = [
  { file: "hero.png", use: "Hero" },
  { file: "fsd.png", use: "FsdSection" },
  { file: "offers.png", use: "OffersSection" },
  { file: "map.png", use: "ChargeHeader" },
  { file: "card-model-y.png", use: "SlideCard" },
  { file: "card-placeholder.png", use: "SlideCard" },
];

export const pageSections = [
  {
    name: "Hero",
    file: "components/sections/Hero.jsx",
    image: "/assets/hero.png",
    body: "Бүтэн өргөнтэй зураг, 40% overlay, голдоо h1, тайлбар, хоёр товч. 640px → 900px.",
  },
  {
    name: "FsdSection",
    file: "components/sections/FsdSection.jsx",
    image: "/assets/fsd.png",
    body: "SplitCard (tall): tagline, гарчиг, хоёр тоо, товч. Баруун талд play товчтой видео зураг.",
  },
  {
    name: "Slider",
    file: "components/slider/Slider.jsx",
    image: "/assets/card-model-y.png",
    body: "Гарчиг + scroll-snap track. Карт бүр 85% → 608px, сумаар нэг картаар гүйлгэнэ.",
  },
  {
    name: "OffersSection",
    file: "components/sections/OffersSection.jsx",
    image: "/assets/offers.png",
    body: "SplitCard: гарчиг, тайлбар, хоёр товч. Зураг object-contain.",
  },
  {
    name: "ChargeHeader",
    file: "components/sections/ChargeHeader.jsx",
    image: "/assets/map.png",
    body: "h1 гарчиг, товчнууд, доор нь 1440:810 харьцаатай газрын зураг.",
  },
  {
    name: "StatsSection",
    file: "components/sections/StatsSection.jsx",
    image: null,
    body: "Зүүн талд SectionHeading, баруун талд Stat-ууд. lg-ээс доош нэг багана.",
  },
];

export const motion = [
  { name: "Товчны hover", value: "150ms · filter, background-color", use: "Primary: brightness(0.92). Бусад: дэвсгэр бараан болно." },
  { name: "Play товч", value: "150ms · scale(1.08)", use: "Hover хийхэд бага зэрэг томорно." },
  { name: "Slider", value: "scroll-behavior: smooth · snap-x mandatory", use: "Сум дарахад нэг карт + 32px gap гүйлгэнэ." },
  { name: "Цэсний холбоос", value: "opacity 0.7", use: "Hover үед бүдгэрнэ, transition байхгүй." },
];
