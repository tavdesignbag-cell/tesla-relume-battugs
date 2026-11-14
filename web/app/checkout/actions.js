"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createCheckout } from "@/lib/byl";
import { supabase } from "@/lib/supabase/public";
import { createAdminClient } from "@/lib/supabase/admin";

async function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

// Карт дээрх "Захиалга өгөх" товч. Үнийг client-ээс биш, slides хүснэгтээс уншина.
export async function startCheckout(formData) {
  const slideId = String(formData.get("slideId") ?? "");

  const { data: slide, error: slideError } = await supabase
    .from("slides")
    .select("id, byl_price")
    .eq("id", slideId)
    .maybeSingle();
  if (slideError) throw new Error(`Карт уншихад алдаа гарлаа: ${slideError.message}`);
  if (!slide?.byl_price) throw new Error("Энэ картад Byl үнэ тохируулагдаагүй байна.");

  const db = createAdminClient();
  const { data: order, error: orderError } = await db
    .from("orders")
    .insert({ slide_id: slide.id, byl_price: slide.byl_price })
    .select("id")
    .single();
  if (orderError) throw new Error(`Захиалга үүсгэж чадсангүй: ${orderError.message}`);

  const base = await siteUrl();
  const resultUrl = `${base}/checkout/success?order=${order.id}`;

  let checkout;
  try {
    checkout = await createCheckout({
      price: slide.byl_price,
      clientReferenceId: order.id,
      successUrl: resultUrl,
      cancelUrl: `${base}/`,
    });
  } catch (err) {
    console.error(err);
    redirect(`${resultUrl}&error=1`);
  }

  await db.from("orders").update({ byl_checkout_id: checkout.id }).eq("id", order.id);
  redirect(checkout.url);
}
