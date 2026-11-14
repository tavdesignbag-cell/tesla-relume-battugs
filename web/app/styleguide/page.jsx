import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitCard from "@/components/sections/SplitCard";
import Stat from "@/components/sections/Stat";
import SlideCard from "@/components/slider/SlideCard";
import { ArrowButton } from "@/components/slider/Slider";
import StyleguideNav from "@/components/styleguide/StyleguideNav";
import { getSlides } from "@/lib/slides";
import {
  alphaColors,
  breakpoints,
  colors,
  fontFamilies,
  icons,
  images,
  layout,
  motion,
  pageSections,
  principles,
  radii,
  sections,
  spacing,
  textStyles,
} from "@/data/styleguide";

export const metadata = {
  title: "Styleguide · Tesla",
  description: "Сайтын дизайн систем: өнгө, үсэг, зай, хэлбэр, компонент, хөдөлгөөн.",
};

/* ===== Туслах компонентууд ===== */

function Code({ children }) {
  return (
    <code className="rounded bg-neutral-5 px-1.5 py-0.5 font-mono text-[13px] leading-normal whitespace-nowrap">
      {children}
    </code>
  );
}

function SgSection({ id, children }) {
  const index = sections.findIndex((s) => s.id === id);
  const label = sections[index].label;
  return (
    <section id={id} className="scroll-mt-28 border-t border-border py-16 lg:scroll-mt-8 lg:py-20">
      <h2 className="text-h2 mb-10 flex items-baseline gap-4 lg:mb-12">
        <span className="font-roboto text-md font-normal tabular-nums opacity-40">
          {String(index + 1).padStart(2, "0")}
        </span>
        {label}
      </h2>
      <div className="flex flex-col gap-14">{children}</div>
    </section>
  );
}

function Sub({ title, children, note }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-h6">{title}</h3>
        {note && <p className="max-w-[640px] text-sm opacity-70">{note}</p>}
      </div>
      {children}
    </div>
  );
}

function Label({ children }) {
  return <p className="text-sm opacity-60">{children}</p>;
}

/* ===== Хуудас ===== */

export default async function StyleguidePage() {
  const slides = await getSlides();

  return (
    <>
      <header className="flex h-[72px] items-center border-b border-border bg-white px-5 lg:px-16">
        <Container className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden h-5 w-px bg-border xs:block" />
            <p className="hidden text-sm xs:block">
              <span className="opacity-60">Дизайн систем</span> · <span className="font-semibold">Styleguide</span>
            </p>
          </div>
          <Button href="/" variant="secondary" size="sm">
            Нүүр хуудас
          </Button>
        </Container>
      </header>

      <div className="px-5 lg:px-16">
        <Container className="lg:grid lg:grid-cols-[208px_minmax(0,1fr)] lg:gap-16">
          <aside className="sticky top-0 z-20 -mx-5 border-b border-border bg-white px-5 py-3 lg:top-0 lg:mx-0 lg:h-screen lg:self-start lg:overflow-y-auto lg:border-0 lg:px-0 lg:py-16">
            <StyleguideNav items={sections} />
          </aside>

          <main className="min-w-0 pb-24">
            {/* Танилцуулга */}
            <div className="flex max-w-[768px] flex-col gap-6 py-16 lg:py-20">
              <p className="font-semibold">Дизайн систем</p>
              <h1 className="text-h1">Tesla styleguide</h1>
              <p className="text-md">
                Сайтын бодит токен, компонентуудаас шууд зурагдсан лавлах. Өнгө, үсгийн хэмжээ нь{" "}
                <Code>app/globals.css</Code>-ийн <Code>@theme</Code>-ээс, жишээнүүд нь{" "}
                <Code>components/</Code>-ийн жинхэнэ компонентуудаас гарна. Компонент өөрчлөгдөхөд энд ч өөрчлөгдөнө.
              </p>
            </div>

            {/* 01 Зарчим */}
            <SgSection id="principles">
              <div className="grid gap-4 xs:grid-cols-2">
                {principles.map((p) => (
                  <div key={p.title} className="flex flex-col gap-3 bg-fg p-6 lg:p-8">
                    <h3 className="text-h6">{p.title}</h3>
                    <p className="opacity-80">{p.body}</p>
                  </div>
                ))}
              </div>
            </SgSection>

            {/* 02 Брэнд */}
            <SgSection id="brand">
              <div className="grid gap-4 lg:grid-cols-3">
                {[
                  { bg: "bg-white border border-border", img: "", label: "Цагаан дээр" },
                  { bg: "bg-black", img: "invert", label: "Хар дээр" },
                  { bg: "bg-royal-blue", img: "invert", label: "Royal blue дээр" },
                ].map((tile) => (
                  <div key={tile.label} className="flex flex-col gap-3">
                    <div className={`flex aspect-[16/9] items-center justify-center ${tile.bg}`}>
                      <img src="/assets/tesla-wordmark.svg" alt="Tesla" width={160} height={21} className={tile.img} />
                    </div>
                    <Label>{tile.label}</Label>
                  </div>
                ))}
              </div>
              <p className="max-w-[640px] text-sm opacity-70">
                <Code>public/assets/tesla-wordmark.svg</Code>, 120×16. <Code>Logo.jsx</Code>-оор Navbar болон
                Footer-т ашиглана. Бараан дэвсгэр дээр CSS <Code>invert</Code>-оор цагаан болгоно. Favicon:{" "}
                <Code>tesla-logo.svg</Code>.
              </p>
            </SgSection>

            {/* 03 Өнгө */}
            <SgSection id="color">
              <Sub title="Үндсэн өнгө" note="globals.css · @theme. Tailwind-д bg-*, text-*, border-* хэлбэрээр.">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                  {colors.map((c) => (
                    <div key={c.token} className="flex flex-col gap-3">
                      <div className={`h-24 border border-border ${c.cls}`} />
                      <div className="flex flex-col gap-1">
                        <Code>{c.token}</Code>
                        <p className="font-roboto text-sm tabular-nums">{c.value}</p>
                        <Label>{c.use}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub title="Тунгалаг хар" note="Хар өнгөний тунгалаг шатлал. Аль ч дэвсгэр дээр ижил харагдана.">
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                  {alphaColors.map((c) => (
                    <div key={c.token} className="flex flex-col gap-3">
                      <div className="grid h-24 grid-cols-2 border border-border">
                        <div className={c.cls} />
                        <div className="bg-fg">
                          <div className={`size-full ${c.cls}`} />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Code>{c.token}</Code>
                        <p className="font-roboto text-sm tabular-nums">{c.value}</p>
                        <Label>{c.use}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub title="Тодрол (contrast)">
                <div className="grid gap-4 xs:grid-cols-3">
                  <div className="flex flex-col gap-2 bg-white p-6 ring-1 ring-border">
                    <p className="text-h6">Аа 21:1</p>
                    <Label>Хар · цагаан дээр</Label>
                  </div>
                  <div className="flex flex-col gap-2 bg-fg p-6">
                    <p className="text-h6">Аа 18.8:1</p>
                    <Label>Хар · fg дээр</Label>
                  </div>
                  <div className="flex flex-col gap-2 bg-royal-blue p-6 text-white">
                    <p className="text-h6">Аа 4.3:1</p>
                    <p className="text-sm opacity-80">Цагаан · royal blue дээр</p>
                  </div>
                </div>
                <p className="max-w-[640px] text-sm opacity-70">
                  Анхаар: royal blue дээрх цагаан бичвэр 4.3:1 буюу WCAG AA-ийн жижиг бичвэрийн 4.5:1 шаардлагад бага
                  зэрэг хүрэхгүй. Primary товчийг жаахан бараан цэнхэрээр солих эсвэл бичвэрийг томруулах нь зүйтэй.
                </p>
              </Sub>
            </SgSection>

            {/* 04 Үсэг */}
            <SgSection id="type">
              <Sub title="Үсгийн гэр бүл" note="next/font/google-оор app/layout.jsx-д ачаална. Subset: latin, cyrillic.">
                <div className="grid gap-4 lg:grid-cols-2">
                  {fontFamilies.map((f) => (
                    <div key={f.name} className="flex flex-col gap-6 bg-fg p-6 lg:p-8">
                      <p className={`${f.cls} text-[56px] leading-none`}>Аа Өө Үү 0123</p>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold">
                          {f.name} <span className="font-normal opacity-60">· {f.role}</span>
                        </p>
                        <p className="text-sm">
                          <Code>{f.cls}</Code> · <Code>{f.variable}</Code> · {f.weights}
                        </p>
                        <Label>{f.use}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub title="Бичвэрийн хэв маяг" note="Сумаар заасан хэмжээ: base → xs (481px) → lg (992px).">
                <div className="flex flex-col">
                  {textStyles.map((t) => (
                    <div
                      key={t.name}
                      className="grid gap-4 border-t border-border py-8 first:border-t-0 first:pt-0 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10"
                    >
                      <div className="flex flex-col gap-1">
                        <Code>{t.name}</Code>
                        <p className="text-sm">{t.spec}</p>
                        <Label>{t.use}</Label>
                      </div>
                      <p className={`${t.cls} min-w-0 wrap-anywhere`}>{t.sample}</p>
                    </div>
                  ))}
                </div>
              </Sub>
            </SgSection>

            {/* 05 Зай */}
            <SgSection id="spacing">
              <Sub title="Зайн шатлал" note="Tailwind-ийн 4px шатлал. Компонентуудад бодитоор хэрэглэгдэж буй алхмууд.">
                <div className="flex flex-col gap-3">
                  {spacing.map((s) => (
                    <div key={s.cls} className="grid grid-cols-[80px_48px_minmax(0,1fr)] items-center gap-4">
                      <Code>{s.cls}</Code>
                      <p className="font-roboto text-sm tabular-nums">{s.px}px</p>
                      <div className="h-3 bg-royal-blue" style={{ width: s.px }} />
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub title="Байршил">
                <div className="flex flex-col">
                  {layout.map((l) => (
                    <div
                      key={l.name}
                      className="grid gap-2 border-t border-border py-4 first:border-t-0 xs:grid-cols-[120px_200px_minmax(0,1fr)] xs:gap-6"
                    >
                      <p className="font-semibold">{l.name}</p>
                      <div>
                        <Code>{l.value}</Code>
                      </div>
                      <Label>{l.use}</Label>
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub title="Breakpoint" note="globals.css-д Tailwind-ийн default breakpoint-уудыг арилгаад эдгээрийг тодорхойлсон.">
                <div className="grid gap-4 xs:grid-cols-2 lg:grid-cols-4">
                  {breakpoints.map((b) => (
                    <div key={b.name} className="flex flex-col gap-2 bg-fg p-6">
                      <Code>{b.name}</Code>
                      <p className="font-roboto text-h6 tabular-nums">{b.value}</p>
                      <Label>{b.use}</Label>
                    </div>
                  ))}
                </div>
              </Sub>
            </SgSection>

            {/* 06 Хэлбэр */}
            <SgSection id="shape">
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
                {radii.map((r) => (
                  <div key={r.name} className="flex flex-col gap-3">
                    <div className={`aspect-square w-full max-w-32 border border-border bg-fg ${r.cls}`} />
                    <div className="flex flex-col gap-1">
                      <p className="text-sm">
                        <Code>{r.cls}</Code> {r.value && <span className="opacity-60">· {r.value}</span>}
                      </p>
                      <Label>{r.use}</Label>
                    </div>
                  </div>
                ))}
              </div>
            </SgSection>

            {/* 07 Шугам */}
            <SgSection id="stroke">
              <div className="grid gap-x-10 gap-y-12 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="flex h-24 items-center bg-white px-6 ring-1 ring-border">
                    <img src="/assets/divider.svg" alt="" className="h-px w-full" />
                  </div>
                  <div>
                    <p className="font-semibold">Hairline</p>
                    <Label>1px · divider.svg эсвэл border-border · footer, цэс, хүснэгт</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex h-24 items-center px-6 ring-1 ring-border">
                    <div className="border-l border-border pl-8">
                      <p className="font-roboto text-[32px] leading-[1.3] font-bold">300</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Stat шугам</p>
                    <Label>border-l border-border · pl-8 · Stat компонент</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex h-24 items-center gap-4 bg-royal-blue px-6">
                    <ArrowButton dir={-1} />
                    <ArrowButton dir={1} />
                  </div>
                  <div>
                    <p className="font-semibold">Сумтай товчны хүрээ</p>
                    <Label>1px white · rounded · өнгөт дэвсгэр дээр харагдана</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex h-24 items-center px-6 ring-1 ring-border">
                    <Button variant="primary" className="outline-2 outline-offset-2 outline-black">
                      Focus
                    </Button>
                  </div>
                  <div>
                    <p className="font-semibold">Focus</p>
                    <Label>
                      Одоогоор тусгай focus style байхгүй, хөтчийн default outline ажиллана. Жишээн дээр 2px, offset
                      2px санал болгож байна.
                    </Label>
                  </div>
                </div>
              </div>
            </SgSection>

            {/* 08 Сүүдэр, бүрхүүл */}
            <SgSection id="shade">
              <Sub title="Overlay" note="Зураг дээрх цагаан бичвэр уншигдахын тулд bg-overlay (black 40%) давхарга тавина.">
                <div className="grid gap-4 xs:grid-cols-2">
                  <div className="flex flex-col gap-3">
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                      <img src="/assets/hero.png" alt="" className="absolute inset-0 size-full object-cover" />
                      <p className="text-h6 relative text-white">Overlay-гүй</p>
                    </div>
                    <Label>Зураг дангаараа</Label>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                      <img src="/assets/hero.png" alt="" className="absolute inset-0 size-full object-cover" />
                      <div className="absolute inset-0 bg-overlay" />
                      <p className="text-h6 relative text-white">bg-overlay · 40%</p>
                    </div>
                    <Label>Hero, FsdSection, SlideCard</Label>
                  </div>
                </div>
              </Sub>
              <Sub title="Сүүдэр">
                <p className="max-w-[640px] opacity-80">
                  Сайт drop shadow хэрэглэдэггүй. Гүнийг өнгөний ялгаа (white → fg) болон overlay-ээр гаргана.
                </p>
              </Sub>
            </SgSection>

            {/* 09 Дүрс, зураг */}
            <SgSection id="icons">
              <Sub title="Дүрс" note="public/assets доторх SVG. <img>-ээр, alt=&quot;&quot; (чимэглэл) хэлбэрээр оруулна.">
                <div className="grid grid-cols-2 gap-4 xs:grid-cols-3 lg:grid-cols-6">
                  {icons.map((icon) => (
                    <div key={icon.file} className="flex flex-col gap-3">
                      <div
                        className={`flex aspect-square items-center justify-center ${icon.file === "play.svg" ? "bg-slide" : "bg-fg"}`}
                      >
                        <img src={`/assets/${icon.file}`} alt="" width={icon.size} height={icon.size} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold wrap-anywhere">{icon.file}</p>
                        <Label>
                          {icon.size}px · {icon.use}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </Sub>
              <Sub title="Зураг">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                  {images.map((img) => (
                    <div key={img.file} className="flex flex-col gap-3">
                      <div className="relative aspect-[4/3] overflow-hidden bg-fg">
                        <img src={`/assets/${img.file}`} alt="" className="absolute inset-0 size-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold wrap-anywhere">{img.file}</p>
                        <Label>{img.use}</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </Sub>
            </SgSection>

            {/* 10 Компонент */}
            <SgSection id="components">
              <Sub
                title="Button · ui/Button.jsx"
                note="<a> элемент. rounded (4px), Inter 500, padding 10×24 (sm: 6×14 → 8×20). icon prop-оор баруун талд 24px дүрс."
              >
                <div className="flex flex-col gap-6 bg-white p-6 ring-1 ring-border lg:p-8">
                  {["md", "sm"].map((size) => (
                    <div key={size} className="flex flex-col gap-3">
                      <Label>size=&quot;{size}&quot;</Label>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button size={size} variant="primary">
                          Захиалга өгөх
                        </Button>
                        <Button size={size} variant="secondary">
                          Туршиж үзэх
                        </Button>
                        <Button size={size} variant="gray">
                          Дэлгэрэнгүй
                        </Button>
                        <Button size={size} variant="gray" icon="/assets/chevron-right.svg">
                          Дэлгэрэнгүй
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  {[
                    ["primary", "Гол үйлдэл. Royal blue, цагаан бичвэр. Хэсэг бүрт нэгээс илүүгүй."],
                    ["secondary", "Хоёрдогч үйлдэл. black 5% дэвсгэр."],
                    ["gray", "Hero, SplitCard дээрх хоёрдогч. Ихэвчлэн chevron дүрстэй."],
                  ].map(([v, d]) => (
                    <div key={v} className="grid gap-2 border-t border-border py-4 xs:grid-cols-[160px_minmax(0,1fr)]">
                      <div>
                        <Code>variant=&quot;{v}&quot;</Code>
                      </div>
                      <Label>{d}</Label>
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub
                title="SectionHeading · ui/SectionHeading.jsx"
                note="tagline (заавал биш) + гарчиг + тайлбар. as=&quot;h1&quot; үед text-h1, бусад үед text-h2."
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="bg-white p-6 ring-1 ring-border lg:p-8">
                    <SectionHeading
                      tagline="Цэнэглэлт"
                      title="Цэнэглэх цэг хайх"
                      description="Ойролцоох Supercharger болон цэнэглэх цэгүүдийг харах."
                    />
                  </div>
                  <div className="bg-white p-6 ring-1 ring-border lg:p-8">
                    <SectionHeading title="Урамшуулал" description="Tesla машины хугацаатай урамшууллууд." />
                  </div>
                </div>
              </Sub>

              <Sub title="Stat · sections/Stat.jsx" note="Roboto 700 тоо + text-h6 тайлбар, зүүн талдаа hairline.">
                <div className="grid gap-8 bg-white p-6 ring-1 ring-border xs:grid-cols-2 lg:p-8">
                  <Stat value="22,593" label="Supercharger" />
                  <Stat value="300" label="Байршлын цэнэглэгч" />
                </div>
              </Sub>

              <Sub
                title="SplitCard · sections/SplitCard.jsx"
                note="bg-fg, lg-ээс дээш хоёр тэнцүү багана. tall prop: lg:h-[640px]. media prop-д зураг."
              >
                <SplitCard
                  media={
                    <img src="/assets/offers.png" alt="" className="absolute inset-0 size-full object-contain" />
                  }
                >
                  <SectionHeading title="Урамшуулал" description="Tesla машины хугацаатай урамшууллууд." />
                  <div className="flex flex-wrap items-center gap-4">
                    <Button variant="primary">Үзэх</Button>
                    <Button variant="gray">Дэлгэрэнгүй</Button>
                  </div>
                </SplitCard>
              </Sub>

              <Sub
                title="SlideCard · slider/SlideCard.jsx"
                note="Slider доторх карт. Зураг + overlay, доор нь ишлэл (Roboto), нэр, лого. 460px → 560px өндөр."
              >
                <div className="grid gap-4 lg:grid-cols-2">
                  {slides.slice(0, 2).map((s) => (
                    <div key={s.id} className="flex [&>article]:flex-[1_1_auto]">
                      <SlideCard {...s} />
                    </div>
                  ))}
                </div>
              </Sub>

              <Sub title="ArrowButton · slider/Slider.jsx" note="Slider-ийн өмнөх, дараах товч. 48px, bg-fg, hover: arrow-hover.">
                <div className="flex items-center justify-between bg-white p-6 ring-1 ring-border lg:p-8">
                  <img src="/assets/slider-dots.svg" alt="" width={88} height={8} />
                  <div className="flex gap-4">
                    <ArrowButton dir={-1} />
                    <ArrowButton dir={1} />
                  </div>
                </div>
              </Sub>

              <Sub title="Бүтцийн компонентууд">
                <div className="flex flex-col">
                  {[
                    ["layout/Navbar.jsx", "72px өндөр, цагаан. Лого, цэс, Туршиж унах товч. 992px-ээс доош hamburger, цэс доош нээгдэнэ."],
                    ["layout/Footer.jsx", "Голлуулсан лого, холбоосууд (text-sm 600), hairline, доод мөр."],
                    ["ui/Container.jsx", "mx-auto, max-w-[1280px]. Агуулгыг төвлөрүүлнэ."],
                    ["ui/Section.jsx", "px-5 py-16 → lg:px-16 lg:py-28. flush prop: overflow-visible."],
                    ["ui/Logo.jsx", "tesla-wordmark.svg, h-9 холбоос."],
                  ].map(([file, body]) => (
                    <div key={file} className="grid gap-2 border-t border-border py-4 xs:grid-cols-[200px_minmax(0,1fr)]">
                      <div>
                        <Code>{file}</Code>
                      </div>
                      <Label>{body}</Label>
                    </div>
                  ))}
                </div>
              </Sub>
            </SgSection>

            {/* 11 Хэсгүүд */}
            <SgSection id="sections">
              <p className="max-w-[640px] opacity-80">
                Нүүр хуудас (<Code>app/page.jsx</Code>) эдгээр хэсгүүдээс дарааллаар бүрдэнэ. Амьд хувилбарыг{" "}
                <Link href="/" className="underline">
                  нүүр хуудаснаас
                </Link>{" "}
                харна уу.
              </p>
              <div className="grid gap-x-4 gap-y-10 xs:grid-cols-2 lg:grid-cols-3">
                {pageSections.map((s, i) => (
                  <div key={s.name} className="flex flex-col gap-4">
                    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-fg">
                      {s.image ? (
                        <img src={s.image} alt="" className="absolute inset-0 size-full object-cover" />
                      ) : (
                        <div className="border-l border-border pl-6">
                          <p className="font-roboto text-[40px] leading-[1.3] font-bold">22,593</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">
                        <span className="font-roboto font-normal tabular-nums opacity-40">{i + 1}.</span> {s.name}
                      </p>
                      <p className="text-sm wrap-anywhere">
                        <Code>{s.file}</Code>
                      </p>
                      <Label>{s.body}</Label>
                    </div>
                  </div>
                ))}
              </div>
            </SgSection>

            {/* 12 Хөдөлгөөн */}
            <SgSection id="motion">
              <div className="grid gap-4 xs:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <div className="flex aspect-[16/9] flex-wrap items-center justify-center gap-4 bg-white p-6 ring-1 ring-border">
                    <Button variant="primary">Hover хий</Button>
                    <Button variant="gray">Hover хий</Button>
                  </div>
                  <Label>Товч · 150ms · brightness / background-color</Label>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src="/assets/fsd.png" alt="" className="absolute inset-0 size-full object-cover" />
                    <div className="absolute inset-0 bg-overlay" />
                    <button
                      type="button"
                      aria-label="Видео тоглуулах (жишээ)"
                      className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 hover:scale-[1.08]"
                    >
                      <img src="/assets/play.svg" alt="" width={64} height={64} />
                    </button>
                  </div>
                  <Label>Play · 150ms · scale(1.08)</Label>
                </div>
              </div>
              <div className="flex flex-col">
                {motion.map((m) => (
                  <div
                    key={m.name}
                    className="grid gap-2 border-t border-border py-4 xs:grid-cols-[160px_minmax(0,1fr)] lg:grid-cols-[160px_280px_minmax(0,1fr)] lg:gap-6"
                  >
                    <p className="font-semibold">{m.name}</p>
                    <div>
                      <Code>{m.value}</Code>
                    </div>
                    <Label>{m.use}</Label>
                  </div>
                ))}
              </div>
              <p className="max-w-[640px] text-sm opacity-70">
                Анхаар: одоогоор <Code>prefers-reduced-motion</Code> тохиргоог дэмжээгүй. Slider-ийн smooth scroll болон
                scale хөдөлгөөнд <Code>motion-reduce:</Code> хувилбар нэмэхийг санал болгож байна.
              </p>
            </SgSection>
          </main>
        </Container>
      </div>
    </>
  );
}
