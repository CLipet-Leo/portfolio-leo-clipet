import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/ui/contact-form';
import { CopyButton } from '@/components/ui/copy-button';
import { ExternalLink } from '@/components/ui/external-link';
import { SITE_META } from '@/constants/site-meta';

/** Clôture : le point de contact. */
export const ClosingSection = () => (
  <section id="contact" className="w-full scroll-mt-16 px-4 py-24">
    <div className="container mx-auto max-w-5xl">
      <h2 className="font-dot text-signal font-bold lowercase">contact</h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <dl className="grid grid-cols-[88px_1fr] content-start gap-x-4 gap-y-4">
          <dt className="pt-0.5 font-mono text-label text-muted-foreground">
            e-mail
          </dt>
          <dd className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <Button variant="link" asChild>
              <a href={`mailto:${SITE_META.email}`}>{SITE_META.email}</a>
            </Button>
            <CopyButton value={SITE_META.email}>copier</CopyButton>
          </dd>
          <dt className="pt-0.5 font-mono text-label text-muted-foreground">
            github
          </dt>
          <dd>
            <Button variant="link" asChild>
              <ExternalLink href={SITE_META.github}>
                github.com/clipet-leo ↗
              </ExternalLink>
            </Button>
          </dd>
          <dt className="pt-0.5 font-mono text-label text-muted-foreground">
            linkedin
          </dt>
          <dd>
            <Button variant="link" asChild>
              <ExternalLink href={SITE_META.linkedin}>
                linkedin.com/in/léo-clipet ↗
              </ExternalLink>
            </Button>
          </dd>
        </dl>

        <ContactForm />
      </div>
    </div>
  </section>
);
