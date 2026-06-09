import type { APIRoute } from "astro";
import { site } from "../../data/site";
import { isMailConfigured, sendInquiryEmail } from "../../lib/mail";

export const prerender = false;

interface InquiryPayload {
  name?: string;
  email?: string;
  matter?: string;
}

function validate(payload: InquiryPayload) {
  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const matter = payload.matter?.trim() ?? "";

  if (!name)
    return { ok: false as const, message: site.messages.apiNameRequired };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false as const, message: site.messages.apiEmailInvalid };
  if (!matter || matter.length < 20)
    return { ok: false as const, message: site.messages.apiMatterTooShort };

  return { ok: true as const, name, email, matter };
}

function deliveryFailedResponse() {
  return new Response(
    JSON.stringify({
      ok: false,
      message: site.messages.apiDeliveryFailed.replace("{email}", site.email),
    }),
    { status: 502, headers: { "Content-Type": "application/json" } },
  );
}

export const POST: APIRoute = async ({ request }) => {
  let payload: InquiryPayload;

  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return new Response(
      JSON.stringify({ ok: false, message: site.messages.apiInvalidRequest }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const result = validate(payload);
  if (!result.ok) {
    return new Response(JSON.stringify(result), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!isMailConfigured()) {
    if (import.meta.env.DEV) {
      console.info("[inquiry] mail not configured", {
        name: result.name,
        email: result.email,
        matterLength: result.matter.length,
      });
    } else {
      return deliveryFailedResponse();
    }
  } else {
    try {
      await sendInquiryEmail(result);
    } catch (error) {
      console.error("[inquiry] send failed", error);
      return deliveryFailedResponse();
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: site.messages.submitSuccess,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
