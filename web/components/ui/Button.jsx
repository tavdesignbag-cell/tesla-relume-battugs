const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent font-medium leading-normal transition-[filter,background-color] duration-150";

const sizes = {
  md: "px-6 py-2.5",
  sm: "px-[14px] py-1.5 xs:px-5 xs:py-2",
};

const variants = {
  primary: "border-royal-blue bg-royal-blue text-white hover:brightness-[0.92]",
  secondary: "bg-neutral-5 text-black hover:bg-neutral-10",
  gray: "bg-btn-gray text-black hover:bg-btn-gray-hover",
};

export default function Button({
  href = "#",
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
}) {
  return (
    <a href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
      {icon && <img src={icon} alt="" width={24} height={24} className="size-6" />}
    </a>
  );
}
