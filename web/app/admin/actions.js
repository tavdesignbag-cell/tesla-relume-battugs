"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Action бүр эрхээ өөрөө шалгана: client-ийн илгээсэн юунд ч итгэхгүй.
async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.isAdmin) throw new Error("Админ эрх шаардлагатай.");
  return createClient();
}

// Алдааны үед form-д буцааж харуулах түүхий утгууд
function rawValues(formData) {
  const text = (key) => String(formData.get(key) ?? "");
  return {
    id: text("id"),
    position: text("position"),
    image: text("image"),
    contain: formData.get("contain") === "on",
    quote: text("quote"),
    name: text("name"),
    meta: text("meta"),
    logo: text("logo"),
  };
}

function fail(message, formData) {
  return { ok: false, message, values: rawValues(formData) };
}

function readFields(formData) {
  const text = (key) => String(formData.get(key) ?? "").trim();
  const fields = {
    position: Number.parseInt(text("position"), 10),
    image: text("image"),
    contain: formData.get("contain") === "on",
    quote: text("quote"),
    name: text("name"),
    meta: text("meta"),
    logo: text("logo"),
  };

  const missing = ["image", "quote", "name", "meta", "logo"].filter((k) => !fields[k]);
  if (missing.length) return { error: `Хоосон талбар: ${missing.join(", ")}` };
  if (!Number.isInteger(fields.position) || fields.position < 1) {
    return { error: "Дараалал 1-ээс их бүхэл тоо байх ёстой." };
  }
  return { fields };
}

function dbError(error) {
  if (error.code === "23505") return "Ийм ID эсвэл дараалалтай карт аль хэдийн байна.";
  return `Хадгалж чадсангүй: ${error.message}`;
}

export async function saveSlide(_prev, formData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { fields, error } = readFields(formData);
  if (error) return fail(error, formData);

  const { data, error: err } = await supabase.from("slides").update(fields).eq("id", id).select("id");
  if (err) return fail(dbError(err), formData);
  if (!data?.length) return fail("Карт олдсонгүй эсвэл эрх хүрэхгүй байна.", formData);

  updateTag("slides");
  return { ok: true, message: "Хадгаллаа." };
}

export async function createSlide(_prev, formData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim().toLowerCase();
  if (!ID_PATTERN.test(id)) {
    return fail("ID зөвхөн латин жижиг үсэг, тоо, зураас (-) байна. Жишээ: model-s", formData);
  }
  const { fields, error } = readFields(formData);
  if (error) return fail(error, formData);

  const { error: err } = await supabase.from("slides").insert({ id, ...fields });
  if (err) return fail(dbError(err), formData);

  updateTag("slides");
  return { ok: true, message: "Шинэ карт нэмэгдлээ." };
}

export async function deleteSlide(formData) {
  const supabase = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const { error } = await supabase.from("slides").delete().eq("id", id);
  if (error) throw new Error(dbError(error));
  updateTag("slides");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
