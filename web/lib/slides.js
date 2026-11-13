import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "@/lib/supabase/public";

// Supabase-ийн public.slides хүснэгтээс slider-ийн картуудыг уншина.
// Минут тутам шинэчлэгдэнэ: dashboard-оос засвал ~1 минутын дотор сайтад гарна.
export async function getSlides() {
  "use cache";
  cacheLife("minutes");
  cacheTag("slides");

  const { data, error } = await supabase
    .from("slides")
    .select("id, image, contain, quote, name, meta, logo")
    .order("position");

  if (error) {
    throw new Error(`Slides уншихад алдаа гарлаа: ${error.message}`);
  }
  return data;
}
