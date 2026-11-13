import "server-only";
import { createClient } from "@/lib/supabase/server";

// Нэвтэрсэн хэрэглэгчийг JWT-ээс баталгаажуулж буцаана.
// isAdmin: зөвхөн app_metadata.role (хэрэглэгч өөрөө засах боломжгүй) дээр тулгуурлана.
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) return null;

  return {
    id: claims.sub,
    email: claims.email,
    isAdmin: claims.app_metadata?.role === "admin",
  };
}
