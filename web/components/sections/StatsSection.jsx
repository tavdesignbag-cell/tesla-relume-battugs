import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "./Stat";

const stats = [
  { value: "22,593", label: "Supercharger" },
  { value: "300", label: "Байршлын цэнэглэгч" },
];

export default function StatsSection() {
  return (
    <Section>
      <Container>
        <div className="flex flex-col items-stretch gap-12 lg:flex-row lg:items-center xl:gap-20">
          <div className="flex flex-none flex-col gap-8 lg:basis-1/2 xl:basis-[616px]">
            <SectionHeading
              tagline="Цэнэглэлт"
              title="Цэнэглэх цэг хайх"
              description="Ойролцоох Supercharger болон цэнэглэх цэгүүдийг харах."
            />
            <div className="flex flex-wrap items-center gap-6">
              <Button variant="secondary">Сүлжээ харах</Button>
              <Button variant="gray" icon="/assets/chevron-right.svg">
                Дэлгэрэнгүй
              </Button>
            </div>
          </div>
          <div className="flex min-w-0 flex-1 basis-0 flex-col gap-12">
            {stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
