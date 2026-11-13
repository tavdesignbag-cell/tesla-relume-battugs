import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitCard from "./SplitCard";

export default function OffersSection() {
  return (
    <Section>
      <Container>
        <SplitCard
          media={<img src="/assets/offers.png" alt="" className="absolute inset-0 size-full object-contain" />}
        >
          <SectionHeading title="Урамшуулал" description="Tesla машины хугацаатай урамшууллууд." />
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Үзэх</Button>
            <Button variant="gray">Дэлгэрэнгүй</Button>
          </div>
        </SplitCard>
      </Container>
    </Section>
  );
}
