export default function Logo({ className = "" }) {
  return (
    <a href="#" aria-label="Нүүр" className={`flex h-9 items-center ${className}`}>
      <img src="/assets/tesla-wordmark.svg" alt="Tesla" width={120} height={16} />
    </a>
  );
}
