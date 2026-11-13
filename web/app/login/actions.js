"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(_prev, formData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { message: "Имэйл, нууц үгээ оруулна уу." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  // Аль талбар буруу байгааг задруулахгүй
  if (error) return { message: "Имэйл эсвэл нууц үг буруу байна." };

  redirect("/admin");
}
