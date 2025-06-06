'use client';

import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted');
      setIsSubmitting(false);
    }, 1500);
  };
  return (
    <section id="contact" className="bg-secondary/30 relative px-4 py-24">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
          Me <span className="text-primary"> Contacter</span>
        </h2>

        {/* <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p> */}

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <h3 className="mb-6 text-2xl font-semibold">
              {' '}
              Informations de Contact
            </h3>

            <div className="justify-center space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <Mail className="text-primary h-6 w-6" />{' '}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
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
                  <Phone className="text-primary h-6 w-6" />{' '}
                </div>
                <div>
                  <h4 className="font-medium"> Téléphone</h4>
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
                  <MapPin className="text-primary h-6 w-6" />{' '}
                </div>
                <div>
                  <h4 className="font-medium"> Localisation</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Lyon, Rhône, France
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="mb-4 font-medium"> Retouvez moi sur :</h4>
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

          <div
            className="bg-card rounded-lg p-8 shadow-xs"
            onSubmit={handleSubmit}
          >
            <h3 className="mb-6 text-2xl font-semibold"> Envoyer un message</h3>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  {' '}
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="border-input bg-background foucs:ring-2 focus:ring-primary w-full rounded-md border px-4 py-3 focus:outline-hidden"
                  placeholder="Jules César..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  {' '}
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="border-input bg-background foucs:ring-2 focus:ring-primary w-full rounded-md border px-4 py-3 focus:outline-hidden"
                  placeholder="placeholder@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  {' '}
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="border-input bg-background foucs:ring-2 focus:ring-primary w-full resize-none rounded-md border px-4 py-3 focus:outline-hidden"
                  placeholder="Lorem Ipsum..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'custom-button flex w-full items-center justify-center gap-2',
                )}
              >
                {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
