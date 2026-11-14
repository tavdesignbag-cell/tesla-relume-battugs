import { Suspense } from "react";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata = {
  title: "Захиалга · Tesla",
  robots: { index: false, follow: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function CheckoutResultPage({ searchParams }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-fg px-5 py-16">
      <div className="flex w-full max-w-[440px] flex-col gap-8 bg-white p-8 ring-1 ring-border">
        <Logo />
        {/* searchParams нь request бүрт өөр тул Suspense дотор */}
        <Suspense fallback={<p className="opacity-60">Ачаалж байна…</p>}>
          <OrderStatus searchParams={searchParams} />
        </Suspense>
        <Button href="/" variant="gray" className="self-start">
          Нүүр хуудас руу буцах
        </Button>
      </div>
    </main>
  );
}

async function OrderStatus({ searchParams }) {
  const { order: orderId, error } = await searchParams;

  if (error) {
    return (
      <Message title="Төлбөрийн хуудас нээгдсэнгүй">
        Byl-тэй холбогдоход алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.
      </Message>
    );
  }

  // Захиалгын uuid нь зөвхөн тухайн худалдан авагчид success_url-аар очдог (таахад боломжгүй)
  const order = UUID.test(orderId ?? "")
    ? (await createAdminClient().from("orders").select("status, amount_total, slides(quote)").eq("id", orderId).maybeSingle()).data
    : null;

  if (!order) {
    return <Message title="Захиалга олдсонгүй">Холбоос буруу эсвэл захиалга устсан байна.</Message>;
  }

  const product = order.slides?.quote ?? "Захиалга";

  if (order.status === "paid") {
    return (
      <Message title="Төлбөр амжилттай">
        {product}-ийн захиалга баталгаажлаа
        {order.amount_total != null && ` (₮${Number(order.amount_total).toLocaleString("mn-MN")})`}. Бид удахгүй
        холбогдох болно.
      </Message>
    );
  }

  return (
    <Message title="Төлбөр баталгаажиж байна…">
      {product}-ийн төлбөрийг Byl-ээс хүлээж байна. Хэдэн секундын дараа хуудсаа шинэчилнэ үү. Банкны шилжүүлгээр
      төлсөн бол баталгаажихад хугацаа орж болно.
    </Message>
  );
}

function Message({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-h6">{title}</h1>
      <p className="opacity-70">{children}</p>
    </div>
  );
}
