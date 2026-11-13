import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// Хугацаа нь дуусах гэж буй auth token-ийг шинэчилж, cookie-д буцааж бичнэ.
export async function updateSession(request) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          Object.entries(headers ?? {}).forEach(([key, value]) => response.headers.set(key, value));
        },
      },
    },
  );

  // createServerClient ба getClaims()-ийн хооронд код бүү нэм (session санамсаргүй гарах эрсдэлтэй).
  await supabase.auth.getClaims();

  return response;
}
