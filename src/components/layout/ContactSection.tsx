'use client';

import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const ContactSection = () => {
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      subject: String(formData.get('subject') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = json.error || 'Erreur';
        setStatus('error');
        toast.error(msg);
        return;
      }
      setStatus('success');
      toast.success('Message envoyé avec succès 🚀');
      form.reset();
    } catch {
      setStatus('error');
      toast.error('Erreur réseau');
    }
  }

  const isSubmitting = status === 'loading';

  return (
    <section id="contact" className="bg-secondary/30 relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Me <span className="text-primary"> Contacter</span>
        </h2>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h3 className="mb-6 text-2xl font-semibold">
              Informations de Contact
            </h3>

            <div className="justify-center space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Mail className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:leoclipet26@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    leoclipet26@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Phone className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Téléphone</h4>
                  <a
                    href="tel:+33671344133"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +33 6 71 34 41 33
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-medium">Localisation</h4>
                  <span className="text-muted-foreground">
                    Lyon, Rhône, France
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="mb-4 font-medium">Retrouvez moi sur :</h4>
              <div className="flex justify-center space-x-4">
                <a
                  className="hover:text-primary transition-colors"
                  href="https://linkedin.com/in/léo-clipet-b885842a3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin />
                </a>
                <a
                  className="hover:text-primary transition-colors"
                  href="https://github.com/CLipet-Leo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card relative rounded-lg p-8 shadow-xs">
            <h3 className="mb-6 text-2xl font-semibold">Envoyer un message</h3>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium"
                >
                  Objet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  maxLength={150}
                  disabled={isSubmitting}
                  className="border-input bg-background foucs:ring-2 focus:ring-primary w-full rounded-md border px-4 py-3 focus:outline-hidden"
                  placeholder="Ex: Demande de collaboration"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className="border-input bg-background foucs:ring-2 focus:ring-primary w-full rounded-md border px-4 py-3 focus:outline-hidden"
                  placeholder="placeholder@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  disabled={isSubmitting}
                  className="border-input bg-background foucs:ring-2 focus:ring-primary w-full resize-none rounded-md border px-4 py-3 focus:outline-hidden"
                  placeholder="Votre message..."
                  rows={5}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'custom-button flex w-full items-center justify-center gap-2',
                  isSubmitting ? 'opacity-70' : '',
                )}
              >
                {isSubmitting
                  ? 'Envoi...'
                  : status === 'success'
                    ? 'Envoyé'
                    : 'Envoyer le message'}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
