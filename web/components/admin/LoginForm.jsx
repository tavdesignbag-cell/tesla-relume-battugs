"use client";

import { useActionState } from "react";
import { signIn } from "@/app/login/actions";
import { inputClass, labelClass } from "./fields";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(signIn, null);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className={labelClass}>
        Имэйл
        <input name="email" type="email" required autoComplete="email" className={inputClass} />
      </label>
      <label className={labelClass}>
        Нууц үг
        <input name="password" type="password" required autoComplete="current-password" className={inputClass} />
      </label>
      {state?.message && (
        <p role="alert" className="text-sm text-red-700">
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-royal-blue px-6 py-2.5 font-medium text-white transition-[filter] duration-150 hover:brightness-[0.92] disabled:opacity-50"
      >
        {pending ? "Нэвтэрч байна…" : "Нэвтрэх"}
      </button>
    </form>
  );
}
