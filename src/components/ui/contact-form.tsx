'use client';

import { cn } from '@/lib/utils';
import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Textarea } from './textarea';

type Status =
  { kind: 'idle' | 'pending' | 'sent' } | { kind: 'error'; message: string };

const STATUS_TEXT = {
  idle: '',
  pending: 'envoi en cours…',
  sent: 'message envoyé, merci.',
} as const;

/** Formulaire court branché sur `POST /api/contact`, statut affiché en ligne. */
function ContactForm({ className }: { className?: string }) {
  const [status, setStatus] = React.useState<Status>({ kind: 'idle' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus({ kind: 'pending' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Message depuis le portfolio',
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      if (response.ok) {
        // Les champs ne sont vidés qu'après un envoi réussi.
        form.reset();
        setStatus({ kind: 'sent' });
        return;
      }
      const body: { error?: string } | null = await response
        .json()
        .catch(() => null);
      setStatus({
        kind: 'error',
        message: body?.error ?? "L'envoi a échoué, réessayez.",
      });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Réseau indisponible, réessayez.',
      });
    }
  };

  const isError = status.kind === 'error';

  return (
    <form
      data-slot="contact-form"
      onSubmit={handleSubmit}
      aria-busy={status.kind === 'pending'}
      className={cn('grid gap-6', className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="contact-email">E-mail</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby="contact-email-help"
        />
        <p
          id="contact-email-help"
          className="font-mono text-label text-muted-foreground"
        >
          pour vous répondre.
        </p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          maxLength={5000}
          className="min-h-32"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status.kind === 'pending'}>
          Envoyer
        </Button>
        <p
          role="status"
          className={cn(
            'font-mono text-label',
            isError ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {isError ? `erreur : ${status.message}` : STATUS_TEXT[status.kind]}
        </p>
      </div>
    </form>
  );
}

export { ContactForm };
