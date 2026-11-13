import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server Component, Server Action-д нэвтэрсэн хэрэглэгчийн session-тэй client.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Component-оос дуудагдвал cookie бичиж чадахгүй. proxy.js session-ийг шинэчилнэ.
          }
        },
      },
    },
  );
}
