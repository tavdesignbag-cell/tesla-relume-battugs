import { verifyBylSignature } from "@/lib/byl";
import { createAdminClient } from "@/lib/supabase/admin";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Byl webhook: https://<домэйн>/api/byl/webhook
// 5 секундын дотор 2xx буцаахгүй бол Byl дахин илгээнэ (8 хүртэл удаа), тиймээс idempotent байх ёстой.
export async function POST(request) {
  const rawBody = await request.text(); // JSON parse хийхээс өмнө — гарын үсэг түүхий body дээр
  if (!verifyBylSignature(rawBody, request.headers.get("byl-signature"))) {
    return Response.json({ message: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.type === "checkout.completed") {
    const checkout = event.data?.object ?? {};
    const orderId = checkout.client_reference_id;
    // Манай сайтаас бус (жш: Byl-ийн checkout link) checkout-ыг алгасна — 500 буцаавал Byl дахин дахин илгээнэ
    if (UUID.test(orderId ?? "")) {
      const db = createAdminClient();
      const { error } = await db
        .from("orders")
        .update({
          status: "paid",
          byl_checkout_id: checkout.id,
          amount_total: checkout.amount_total,
          customer_email: checkout.customer_email,
          phone_number: checkout.phone_number,
          paid_at: checkout.updated_at ?? new Date().toISOString(),
        })
        .eq("id", orderId)
        .neq("status", "paid");
      // DB алдаа гарвал 500 → Byl дахин оролдоно
      if (error) {
        console.error("Byl webhook: order update failed", error);
        return Response.json({ message: "Order update failed" }, { status: 500 });
      }
    }
  }

  return Response.json({ received: true });
}
