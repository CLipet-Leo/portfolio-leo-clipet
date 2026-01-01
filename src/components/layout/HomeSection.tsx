'use client';

import { cn } from '@/lib/utils';
import {
  AtSign,
  Building2,
  Clock,
  Code2,
  Globe,
  MapPin,
  Mars,
  Smartphone,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { HomeItem } from '../ui/homeItem';
import { Separator } from '../ui/separator';
import { RotatingText } from '../ui/shadcn-io/rotating-text';

export const HomeSection = () => {
  const [hour, setHour] = useState<string>(
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedHour = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setHour(formattedHour);
    }, 60000); // Met à jour toutes les minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-screen w-full flex-col items-center justify-center px-2 py-6"
    >
      <div className="container mx-auto max-w-4xl">
        <Card className="flex flex-col items-center gap-6 p-4 md:flex-row md:gap-4">
          <CardContent />
          <Avatar className="size-24 shrink-0 md:size-32">
            <AvatarImage src="img/PP-discord.jpg" alt="Léo Clipet" />
            <AvatarFallback>LC</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center space-y-4 text-center md:items-start md:text-left">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Léo Clipet
            </h1>
            <Separator className="w-24" />
            <div
              className={cn(
                'text-muted-foreground flex flex-row items-center gap-2 font-mono text-lg font-medium md:text-xl',
              )}
            >
              <p>Développeur</p>
              <RotatingText
                className="text-primary w-36"
                transition={{ type: 'spring', duration: 0.5 }}
                text={[
                  'Logiciel',
                  'Web',
                  'Applications',
                  'Jeux Vidéo',
                  '3D Temps Réel',
                ]}
                duration={3000}
              />
            </div>
          </div>
        </Card>
      </div>
      <div className="container mx-auto mt-12 max-w-2xl space-y-4 px-4">
        <HomeItem
          title="Passionné par la conception de solutions numériques."
          icon={<Code2 />}
        />
        <HomeItem title="Alternant chez Albedya" icon={<Building2 />} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <HomeItem
            title="Lyon, France"
            icon={<MapPin />}
            href="https://maps.app.goo.gl/rgmeJXYsxXH5J5MD7"
          />
          <HomeItem title={hour} icon={<Clock />} />
          <HomeItem
            title="+33 6 71 34 41 33"
            icon={<Smartphone />}
            href="tel:+33671344133"
          />
          <HomeItem
            title="leoclipet26@gmail.com"
            icon={<AtSign />}
            href="mailto:leoclipet26@gmail.com"
          />
          <HomeItem
            title="clipet-leo.dev"
            icon={<Globe />}
            href="https://clipet-leo.dev"
          />
          <HomeItem title="He / Him" icon={<Mars />} />
        </div>
      </div>
    </section>
  );
};
