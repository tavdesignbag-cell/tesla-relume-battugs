export default function SectionHeading({ tagline, title, description, as: Heading = "h2", className = "" }) {
  const body = (
    <div className={`flex flex-col gap-6 ${tagline ? "" : className}`}>
      <Heading className={Heading === "h1" ? "text-h1" : "text-h2"}>{title}</Heading>
      {description && <p className="text-md">{description}</p>}
    </div>
  );

  if (!tagline) return body;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <p className="font-semibold">{tagline}</p>
      {body}
    </div>
  );
}
