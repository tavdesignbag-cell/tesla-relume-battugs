import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { footerLinks } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="px-5 py-12 lg:px-16 lg:py-20">
      <Container className="flex flex-col items-center gap-20">
        <div className="flex w-full max-w-[480px] flex-col items-center gap-8">
          <Logo className="justify-center" />
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4 text-sm font-semibold whitespace-nowrap xs:gap-8">
            {footerLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:underline">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex w-full flex-col gap-8">
          <img src="/assets/divider.svg" alt="" className="h-px w-full" />
          <div className="flex justify-between text-sm">
            <p>.</p>
            <div className="flex gap-6">
              <a href="#" className="underline">.</a>
              <a href="#" className="underline">.</a>
              <a href="#" className="underline">.</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
