"use client";

import { useFormStatus } from "react-dom";
import { startCheckout } from "@/app/checkout/actions";

// Byl checkout руу шилжүүлэх товч. Сервер Byl-ээс төлбөрийн хуудас үүсгэтэл давхар дарахаас сэргийлнэ.
export default function CheckoutButton({ slideId, children }) {
  return (
    <form action={startCheckout}>
      <input type="hidden" name="slideId" value={slideId} />
      <SubmitButton>{children}</SubmitButton>
    </form>
  );
}

function SubmitButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center whitespace-nowrap rounded bg-royal-blue px-[14px] py-1.5 font-medium text-white transition-[filter] duration-150 hover:brightness-[0.92] disabled:opacity-60 xs:px-5 xs:py-2"
    >
      {pending ? "Шилжиж байна…" : children}
    </button>
  );
}
