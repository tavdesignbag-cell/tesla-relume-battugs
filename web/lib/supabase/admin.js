import "server-only";
import { createClient } from "@supabase/supabase-js";

// RLS-ийг тойрдог secret key-тэй client. Зөвхөн сервер дээр, хэрэглэгчийн session байхгүй
// газарт (checkout action, Byl webhook) захиалга бичих/уншихад ашиглана.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_SECRET_KEY орчны хувьсагч тохируулагдаагүй байна (.env.local / Vercel).");
  }
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
