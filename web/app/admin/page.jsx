import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import SlideForm from "@/components/admin/SlideForm";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata = {
  title: "Админ · Tesla",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-fg">
      <header className="flex h-[72px] items-center border-b border-border bg-white px-5 lg:px-16">
        <Container className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo />
            <span className="hidden h-5 w-px bg-border xs:block" />
            <p className="hidden text-sm font-semibold xs:block">Админ</p>
          </div>
          <Link href="/" className="text-sm hover:underline">
            Сайт руу буцах
          </Link>
        </Container>
      </header>

      <main className="px-5 py-12 lg:px-16 lg:py-16">
        <div className="mx-auto flex w-full max-w-[960px] flex-col gap-10">
          {/* Session-ийг request бүрт уншдаг тул Suspense дотор */}
          <Suspense fallback={<p className="opacity-60">Ачаалж байна…</p>}>
            <AdminContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

async function AdminContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  if (!user.isAdmin) {
    return (
      <div className="flex flex-col items-start gap-4 bg-white p-8 ring-1 ring-border">
        <h1 className="text-h6">Эрх хүрэхгүй байна</h1>
        <p className="opacity-70">{user.email} хаягт админ эрх олгогдоогүй байна.</p>
        <form action={signOut}>
          <button type="submit" className="text-sm underline">
            Гарах
          </button>
        </form>
      </div>
    );
  }

  // Админд кэшгүй, шинэ өгөгдөл
  const supabase = await createClient();
  const { data: slides, error } = await supabase.from("slides").select("*").order("position");
  if (error) throw new Error(`Slides уншихад алдаа гарлаа: ${error.message}`);

  const nextPosition = (slides.at(-1)?.position ?? 0) + 1;

  // Byl-ээр орж ирсэн сүүлийн захиалгууд (RLS: зөвхөн админ уншина)
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, created_at, status, amount_total, phone_number, customer_email, slides(quote)")
    .order("created_at", { ascending: false })
    .limit(20);
  if (ordersError) throw new Error(`Захиалга уншихад алдаа гарлаа: ${ordersError.message}`);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-h2">Машины картууд</h1>
          <p className="opacity-70">
            Өөрчлөлт хадгалмагц нүүр хуудсанд шууд гарна. Нийт {slides.length} карт.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="opacity-60">{user.email}</span>
          <form action={signOut}>
            <button type="submit" className="rounded-md bg-neutral-5 px-4 py-1.5 font-medium hover:bg-neutral-10">
              Гарах
            </button>
          </form>
        </div>
      </div>

      <section className="flex flex-col gap-4">
        {slides.map((slide) => (
          <SlideForm key={slide.id} slide={slide} />
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h6">Шинэ карт нэмэх</h2>
        <SlideForm nextPosition={nextPosition} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h6">Сүүлийн захиалгууд (Byl)</h2>
        {orders.length === 0 ? (
          <p className="bg-white p-5 text-sm opacity-60 ring-1 ring-border">Одоогоор захиалга алга.</p>
        ) : (
          <div className="overflow-x-auto bg-white ring-1 ring-border">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border">
                <tr>
                  {["Огноо", "Карт", "Төлөв", "Дүн", "Холбоо барих"].map((h) => (
                    <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString("mn-MN", { timeZone: "Asia/Ulaanbaatar" })}
                    </td>
                    <td className="px-4 py-3">{o.slides?.quote ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className={o.status === "paid" ? "font-medium text-green-700" : "opacity-60"}>
                        {o.status === "paid" ? "Төлөгдсөн" : "Хүлээгдэж буй"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {o.amount_total != null ? `₮${Number(o.amount_total).toLocaleString("mn-MN")}` : "—"}
                    </td>
                    <td className="px-4 py-3">{[o.phone_number, o.customer_email].filter(Boolean).join(" · ") || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
