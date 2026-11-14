import Button from "@/components/ui/Button";

// Гештальт: зураг (машин) бол гол дүрс тул дунд хэсгийг чөлөөтэй үлдээнэ.
// Гарчиг + дэд текст дээд талд нэг бүлэг (ойролцоо), товчнууд доод талд тэнцүү өргөнтэй хос (ижил төстэй).
export default function Hero() {
  return (
    <section className="relative flex h-svh min-h-[600px] flex-col items-center justify-between overflow-hidden px-5 pt-[calc(72px+12vh)] pb-12 text-center text-black lg:px-16 lg:pb-16">
      <img src="/assets/hero.png" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="relative flex flex-col items-center gap-1">
        <h1 className="text-hero">Model 3</h1>
        <p className="text-base">Жилийн 1.99% хүүтэй</p>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center gap-4 xs:w-auto xs:flex-row xs:gap-6">
        <Button variant="primary" className="w-full xs:w-auto xs:min-w-[264px]">
          Захиалга өгөх
        </Button>
        <Button variant="light" className="w-full xs:w-auto xs:min-w-[264px]">
          Дэлгэрэнгүй
        </Button>
      </div>
    </section>
  );
}
