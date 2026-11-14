"use client";

import { useActionState, useRef, useState } from "react";
import { createSlide, deleteSlide, saveSlide } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import {
  IMAGE_BUCKET,
  IMAGE_MAX_BYTES,
  IMAGE_TYPES,
  imageOptions,
  inputClass,
  labelClass,
  logoOptions,
} from "./fields";

const EMPTY = { id: "", position: "", image: "", contain: false, quote: "", name: "", meta: "", logo: "", byl_price: "" };

// Нэг картыг засах (slide өгвөл) эсвэл шинээр нэмэх (slide өгөхгүй бол) form
export default function SlideForm({ slide, nextPosition }) {
  const isNew = !slide;
  const initial = slide ?? { ...EMPTY, position: nextPosition, logo: logoOptions[0] };
  const [state, formAction, pending] = useActionState(isNew ? createSlide : saveSlide, null);

  // React action дууссаны дараа form-ийг defaultValue руу reset хийдэг.
  // Алдаа гарвал хэрэглэгчийн оруулсныг алдахгүйн тулд defaultValue-г тэр утгаар солино.
  const values = state?.ok === false && state.values ? state.values : initial;

  // Зургийн preview: бичих үед шинэчлэгдэнэ, шинэ карт амжилттай нэмэгдвэл цэвэрлэгдэнэ
  const [imageOverride, setImageOverride] = useState(null);
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    setImageOverride(null);
  }
  const image = imageOverride ?? values.image;

  // Компьютерээс зураг сонгоход хөтчөөс шууд Supabase Storage руу байршуулна
  const imageInputRef = useRef(null);
  const [upload, setUpload] = useState({ busy: false, message: null, ok: false });

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      setUpload({ busy: false, ok: false, message: "Зөвхөн PNG, JPG, WEBP, AVIF, GIF зураг." });
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      setUpload({ busy: false, ok: false, message: "Зураг 5MB-аас ихгүй байх ёстой." });
      return;
    }

    setUpload({ busy: true, ok: false, message: "Байршуулж байна…" });
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const supabase = createClient();
    const { error } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file, { contentType: file.type, cacheControl: "31536000" });

    if (error) {
      setUpload({ busy: false, ok: false, message: `Байршуулж чадсангүй: ${error.message}` });
      return;
    }
    const { data } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
    if (imageInputRef.current) imageInputRef.current.value = data.publicUrl;
    setImageOverride(data.publicUrl);
    setUpload({
      busy: false,
      ok: true,
      message: isNew ? "Зураг байршлаа. «Карт нэмэх» дарна уу." : "Зураг байршлаа. «Хадгалах» дарна уу.",
    });
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5 bg-white p-5 ring-1 ring-border lg:p-6"
    >
      {!isNew && <input type="hidden" name="id" value={slide.id} />}

      <div className="grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-slide lg:aspect-auto lg:h-full">
          {image && (
            <img
              src={image}
              alt=""
              className={`absolute inset-0 size-full ${values.contain ? "object-contain" : "object-cover"}`}
            />
          )}
        </div>

        <div className="grid gap-4 xs:grid-cols-2">
          {isNew ? (
            <label className={labelClass}>
              ID (латин, жишээ: model-s)
              <input name="id" required pattern="[a-z0-9]+(-[a-z0-9]+)*" defaultValue={values.id} className={inputClass} />
            </label>
          ) : (
            <div className={labelClass}>
              ID
              <p className="py-2 font-mono text-[13px] opacity-60">{slide.id}</p>
            </div>
          )}
          <label className={labelClass}>
            Дараалал
            <input name="position" type="number" min={1} required defaultValue={values.position} className={inputClass} />
          </label>
          <label className={`${labelClass} xs:col-span-2`}>
            Гарчиг / ишлэл
            <input name="quote" required defaultValue={values.quote} className={inputClass} />
          </label>
          <label className={labelClass}>
            Үнэ / нэр
            <input name="name" required defaultValue={values.name} className={inputClass} />
          </label>
          <label className={labelClass}>
            Тайлбар
            <input name="meta" required defaultValue={values.meta} className={inputClass} />
          </label>
          <div className={`${labelClass} xs:col-span-2`}>
            <label htmlFor={`image-${slide?.id ?? "new"}`}>Зураг</label>
            <div className="flex flex-wrap items-center gap-3">
              <input
                id={`image-${slide?.id ?? "new"}`}
                ref={imageInputRef}
                name="image"
                required
                list="image-options"
                defaultValue={values.image}
                onChange={(e) => setImageOverride(e.target.value)}
                className={`${inputClass} min-w-0 flex-1 basis-60`}
              />
              {/* name-гүй: файл server action руу явахгүй, зөвхөн Storage руу */}
              <label
                className={`inline-flex shrink-0 cursor-pointer items-center rounded-md bg-neutral-5 px-4 py-2 font-medium transition-colors duration-150 hover:bg-neutral-10 ${
                  upload.busy ? "pointer-events-none opacity-50" : ""
                }`}
              >
                {upload.busy ? "Байршуулж байна…" : "Компьютерээс оруулах"}
                <input
                  type="file"
                  accept={IMAGE_TYPES.join(",")}
                  onChange={handleUpload}
                  disabled={upload.busy}
                  className="sr-only"
                />
              </label>
            </div>
            {upload.message && (
              <p role="status" className={`text-sm font-normal ${upload.ok ? "text-green-700" : "text-red-700"}`}>
                {upload.message}
              </p>
            )}
          </div>
          <label className={labelClass}>
            Лого
            <select name="logo" defaultValue={values.logo} className={inputClass}>
              {logoOptions.map((src) => (
                <option key={src} value={src}>
                  {src.split("/").pop()}
                </option>
              ))}
            </select>
          </label>
          <label className={labelClass}>
            Byl үнийн key (хоосон бол товчгүй)
            <input
              name="byl_price"
              pattern="[A-Za-z0-9_.\-]{1,64}"
              placeholder="жш: model_y_l_premium"
              defaultValue={values.byl_price ?? ""}
              className={inputClass}
            />
          </label>
          <label className="flex items-center gap-2 text-sm xs:col-span-2">
            <input name="contain" type="checkbox" defaultChecked={values.contain} className="size-4" />
            Зургийг бүтнээр нь харуулах (тайрахгүй)
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-royal-blue px-5 py-2 font-medium text-white transition-[filter] duration-150 hover:brightness-[0.92] disabled:opacity-50"
        >
          {pending ? "Хадгалж байна…" : isNew ? "Карт нэмэх" : "Хадгалах"}
        </button>
        {!isNew && (
          <button
            type="submit"
            formAction={deleteSlide}
            formNoValidate
            disabled={pending}
            onClick={(e) => {
              if (!window.confirm(`"${slide.quote}" картыг устгах уу?`)) e.preventDefault();
            }}
            className="rounded-md bg-neutral-5 px-5 py-2 font-medium text-red-700 transition-colors duration-150 hover:bg-neutral-10 disabled:opacity-50"
          >
            Устгах
          </button>
        )}
        {state?.message && (
          <p role="status" className={`text-sm ${state.ok ? "text-green-700" : "text-red-700"}`}>
            {state.message}
          </p>
        )}
      </div>

      <datalist id="image-options">
        {imageOptions.map((src) => (
          <option key={src} value={src} />
        ))}
      </datalist>
    </form>
  );
}
