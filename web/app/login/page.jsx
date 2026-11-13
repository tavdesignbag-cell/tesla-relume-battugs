import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Нэвтрэх · Tesla",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fg px-5 py-16">
      <div className="flex w-full max-w-[400px] flex-col gap-8 bg-white p-8 ring-1 ring-border">
        <div className="flex flex-col gap-4">
          <Logo />
          <div className="flex flex-col gap-1">
            <h1 className="text-h6">Админ нэвтрэх</h1>
            <p className="text-sm opacity-60">Машины картуудыг засахын тулд нэвтэрнэ үү.</p>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
