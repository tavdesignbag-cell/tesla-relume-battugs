import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request) {
  return updateSession(request);
}

// Зөвхөн нэвтрэлт хэрэгтэй хуудсууд дээр ажиллана. Нийтийн хуудсууд хурдан хэвээр.
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
