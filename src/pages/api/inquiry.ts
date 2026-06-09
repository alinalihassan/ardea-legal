import type { APIRoute } from "astro";
import { site } from "../../data/site";

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

  const webhook = import.meta.env.INQUIRY_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.name,
          email: result.email,
          matter: result.matter,
          source: "ardea-legal-website",
        }),
      });
    } catch {
      return new Response(
        JSON.stringify({
          ok: false,
          message: site.messages.apiDeliveryFailed.replace(
            "{email}",
            site.email,
          ),
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }
  } else if (import.meta.env.PROD) {
    console.info("[inquiry]", {
      name: result.name,
      email: result.email,
      matterLength: result.matter.length,
    });
  }

  return new Response(
    JSON.stringify({
      ok: true,
      message: site.messages.submitSuccess,
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
};
