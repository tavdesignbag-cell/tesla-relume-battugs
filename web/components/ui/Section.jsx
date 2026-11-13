export default function Section({ as: Tag = "section", flush = false, className = "", children }) {
  return (
    <Tag
      className={`px-5 py-16 lg:px-16 lg:py-28 ${flush ? "overflow-visible" : "overflow-hidden"} ${className}`}
    >
      {children}
    </Tag>
  );
}
