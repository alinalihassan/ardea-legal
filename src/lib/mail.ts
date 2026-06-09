import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { site } from "../data/site";

let transporter: Transporter | null = null;

function getTransporter() {
  const user = import.meta.env.EMAIL_USERNAME;
  const pass = import.meta.env.EMAIL_PASSWORD;

  if (!user || !pass) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: "smtp.strato.com",
      port: 587,
      secure: false,
      auth: { user, pass },
    });
  }

  return transporter;
}

export function isMailConfigured() {
  return Boolean(
    import.meta.env.EMAIL_USERNAME && import.meta.env.EMAIL_PASSWORD,
  );
}

export async function sendInquiryEmail(input: {
  name: string;
  email: string;
  matter: string;
}) {
  const mail = getTransporter();
  if (!mail) {
    throw new Error("Email is not configured.");
  }

  const from = import.meta.env.EMAIL_FROM ?? import.meta.env.EMAIL_USERNAME;
  const to = import.meta.env.EMAIL_TO ?? site.email;

  await mail.sendMail({
    from: `"${site.name}" <${from}>`,
    to,
    replyTo: `"${input.name}" <${input.email}>`,
    subject: `Nieuwe aanvraag via ${site.name}`,
    text: [
      "Nieuwe aanvraag via de website",
      "",
      `Naam: ${input.name}`,
      `E-mail: ${input.email}`,
      "",
      "Vraag:",
      input.matter,
    ].join("\n"),
  });
}
