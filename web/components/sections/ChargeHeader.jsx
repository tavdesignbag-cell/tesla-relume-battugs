import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ChargeHeader() {
  return (
    <section className="flex flex-col overflow-hidden">
      <Section as="div" flush>
        <Container>
          <div className="flex max-w-[768px] flex-col gap-8">
            <SectionHeading
              as="h1"
              title="Цэнэглэх цэг хайх"
              description="Ойролцоох Supercharger болон цэнэглэх цэгүүдийг харах."
            />
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Залгах</Button>
              <Button variant="secondary">Очих</Button>
            </div>
          </div>
        </Container>
      </Section>
      <div className="relative aspect-[1440/810] w-full">
        <img
          src="/assets/map.png"
          alt="Цэнэглэх сүлжээний газрын зураг"
          className="absolute inset-0 size-full object-contain"
        />
      </div>
    </section>
  );
}
