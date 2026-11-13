export default function Stat({ value, label }) {
  return (
    <div className="flex flex-col gap-2 border-l border-border pl-8">
      <p className="font-roboto text-[56px] leading-[1.3] font-bold lg:text-[80px]">{value}</p>
      <p className="text-h6">{label}</p>
    </div>
  );
}
