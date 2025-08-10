/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function validateEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// (Optionnel) mini rate limit mémoire (reset au redeploy)
const recent = new Map<string, string>();
const WINDOW_MS = 60_000;
const LIMIT = 3;

export async function POST(req: Request) {
  try {
    const ip =
      (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      'unknown';

    const now = Date.now();
    const timestamps = [...(recent.get(ip)?.toString().split('|') || [])]
      .filter(Boolean)
      .map(Number)
      .filter((t) => now - t < WINDOW_MS);

    if (timestamps.length >= LIMIT) {
      return NextResponse.json(
        { error: 'Trop de requêtes, réessayez dans une minute.' },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body)
      return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });

    const { subject, email, message } = body as {
      subject?: string;
      email?: string;
      message?: string;
    };

    if (
      !subject ||
      !email ||
      !message ||
      subject.length > 150 ||
      message.length > 5000 ||
      !validateEmail(email)
    ) {
      return NextResponse.json(
        { error: 'Champs invalides' },
        { status: 400 },
      );
    }

    const to = process.env.CONTACT_TO;
    const from = process.env.CONTACT_FROM || 'onboarding@resend.dev';
    if (!to) {
      return NextResponse.json(
        { error: 'CONTACT_TO non configuré' },
        { status: 500 },
      );
    }

    await resend.emails.send({
      from,
      to,
      subject: subject,
      replyTo: email,
      text: [
        `Objet: ${subject}`,
        `Email de l'expéditeur: ${email}`,
        '',
        'Message:',
        message,
        '',
        '---',
        `Ce message a été envoyé depuis le portfolio (${process.env.NEXT_PUBLIC_SITE_URL || 'origine inconnue'})`,
        `Date: ${new Date().toISOString()}`,
      ].join('\n'),
    });

    timestamps.push(now);
    recent.set(ip, timestamps.join('|'));

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'Erreur interne' },
      { status: 500 },
    );
  }
}
