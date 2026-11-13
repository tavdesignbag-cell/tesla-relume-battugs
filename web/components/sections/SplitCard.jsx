export default function SplitCard({ media, tall = false, children }) {
  return (
    <div className={`flex flex-col overflow-hidden bg-fg lg:flex-row lg:items-stretch ${tall ? "lg:h-[640px]" : ""}`}>
      <div className="flex min-w-0 flex-1 basis-0 flex-col justify-center gap-8 px-6 py-8 lg:p-12">{children}</div>
      <div className="relative aspect-[4/3] min-w-0 flex-none overflow-hidden lg:aspect-auto lg:flex-1 lg:basis-0">
        {media}
      </div>
    </div>
  );
}
