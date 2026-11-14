import "server-only";
import crypto from "node:crypto";

// Byl төлбөрийн API (https://byl.mn/docs). Токен зөвхөн сервер дээр — хөтөч рүү хэзээ ч гарахгүй.
const BASE_URL = "https://byl.mn/api/v1";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} орчны хувьсагч тохируулагдаагүй байна (.env.local / Vercel).`);
  return value;
}

async function bylRequest(path, { method = "GET", body } = {}) {
  const projectId = requireEnv("BYL_PROJECT_ID");
  const res = await fetch(`${BASE_URL}/projects/${projectId}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${requireEnv("BYL_TOKEN")}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    // 422 бизнес логик: { error, message }; валидац: { message, errors }; 401/403: { message }
    const reason = json?.error ?? json?.message ?? res.statusText;
    throw new Error(`Byl ${method} ${path} → ${res.status}: ${reason}`);
  }
  return json.data;
}

// Byl-ийн hosted төлбөрийн хуудас үүсгэнэ. Буцаах: { id, url }
export function createCheckout({ price, clientReferenceId, successUrl, cancelUrl }) {
  return bylRequest("/checkouts", {
    method: "POST",
    body: {
      items: [{ price, quantity: 1 }],
      client_reference_id: clientReferenceId,
      success_url: successUrl,
      cancel_url: cancelUrl,
      phone_number_collection: true,
    },
  });
}

// Webhook-ийн Byl-Signature header-ийг түүхий body-ийн HMAC-SHA256 (hex)-тэй тогтмол хугацаанд харьцуулна.
export function verifyBylSignature(rawBody, signature) {
  if (!signature) return false;
  const expected = crypto.createHmac("sha256", requireEnv("BYL_WEBHOOK_SECRET")).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
