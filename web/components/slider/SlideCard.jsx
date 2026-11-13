export default function SlideCard({ image, contain = false, quote, name, meta, logo }) {
  return (
    <article className="relative flex h-[460px] flex-[0_0_85%] snap-start flex-col justify-end bg-slide p-6 text-white lg:h-[560px] lg:flex-[0_0_608px] lg:p-8">
      <img
        src={image}
        alt=""
        className={`absolute inset-0 size-full ${contain ? "object-contain" : "object-cover"}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-overlay" />
      <div className="relative flex flex-col gap-6">
        <p className="font-roboto text-md">{quote}</p>
        <div className="flex items-end gap-6">
          <div className="min-w-0 flex-1 basis-0">
            <p className="font-semibold">{name}</p>
            <p>{meta}</p>
          </div>
          <img src={logo} alt="" width={120} height={48} className="h-12 w-[120px] shrink-0" />
        </div>
      </div>
    </article>
  );
}
