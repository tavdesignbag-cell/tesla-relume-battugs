import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitCard from "./SplitCard";

const numbers = [
  { value: "7 дахин", label: "Цөөн осол" },
  { value: "17,034,881,000", label: "Туулсан миль" },
];

function Media() {
  return (
    <>
      <img src="/assets/fsd.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-overlay" />
      <button
        type="button"
        aria-label="Видео тоглуулах"
        className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 hover:scale-[1.08]"
      >
        <img src="/assets/play.svg" alt="" width={64} height={64} />
      </button>
    </>
  );
}

export default function FsdSection() {
  return (
    <Section>
      <Container>
        <SplitCard tall media={<Media />}>
          <SectionHeading
            tagline="Тоо баримт"
            title={
              <>
                Бүрэн автомат жолоодлого
                <br />
                (Хяналттай)
              </>
            }
            description="Жолоодлогыг хялбар болгоно. Сард $99."
          />
          <div className="flex flex-col gap-6 py-2 xs:flex-row">
            {numbers.map((n) => (
              <div key={n.label} className="flex min-w-0 flex-1 basis-0 flex-col gap-2 wrap-anywhere">
                <p className="text-h2">{n.value}</p>
                <p>{n.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="secondary">Туршиж үзэх</Button>
            <Button variant="gray" icon="/assets/chevron-right.svg">
              Дэлгэрэнгүй
            </Button>
          </div>
        </SplitCard>
      </Container>
    </Section>
  );
}
