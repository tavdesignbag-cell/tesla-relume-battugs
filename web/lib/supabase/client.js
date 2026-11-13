import { createBrowserClient } from "@supabase/ssr";

// Хөтөч дотор (Client Component) нэвтэрсэн хэрэглэгчийн session-тэй client
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
