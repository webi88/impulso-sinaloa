import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DEST_EMAIL = "jorge.gomez@mwgroup.com.mx";

export async function POST(request: Request) {
  try {
    const { name, location, message } = await request.json();

    if (!name || !message) {
      return NextResponse.json({ error: "Nombre y mensaje son obligatorios." }, { status: 400 });
    }

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log(`[Contact] SMTP not configured — message from ${name} (${location}): ${message}`);
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Impulso Sinaloa — Voces" <${process.env.SMTP_USER}>`,
      to: DEST_EMAIL,
      subject: `Nueva voz de Sinaloa: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f2f4f1;">
          <div style="background: #0d2b45; padding: 20px 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">Nueva voz de Sinaloa</h2>
            <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 13px;">Formulario de contacto — Impulso Sinaloa</p>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; width: 120px;">Nombre</td>
                <td style="padding: 8px 0; color: #0d2b45; font-size: 14px; font-weight: 700;">${name}</td>
              </tr>
              ${location ? `
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Ciudad</td>
                <td style="padding: 8px 0; color: #0d2b45; font-size: 14px;">${location}</td>
              </tr>` : ""}
              <tr>
                <td colspan="2" style="padding-top: 16px;">
                  <div style="background: #f8fafc; border-left: 4px solid #0fa3a3; border-radius: 4px; padding: 12px 16px;">
                    <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
                  </div>
                </td>
              </tr>
            </table>
            <p style="margin: 20px 0 0; color: #94a3b8; font-size: 11px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
              Enviado desde impulsosinaloa.com · ${new Date().toLocaleString("es-MX", { timeZone: "America/Mazatlan" })}
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Error al enviar el mensaje." }, { status: 500 });
  }
}
