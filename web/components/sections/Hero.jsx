import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex h-[640px] items-center justify-center overflow-hidden px-5 lg:h-[900px] lg:px-16">
      <img src="/assets/hero.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="relative flex w-full max-w-[768px] flex-col items-center gap-6 text-center text-white">
        <h1 className="text-h1">Model 3</h1>
        <p className="text-md">Жилийн 1.99% хүүтэй</p>
        {/* 24 + 8 = 32px зай */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button variant="primary">Захиалга өгөх</Button>
          <Button variant="gray">Дэлгэрэнгүй</Button>
        </div>
      </div>
    </section>
  );
}
