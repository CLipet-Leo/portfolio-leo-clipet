import { Skeleton } from '@/components/ui/skeleton';

/** Squelette de la fiche longue, à la taille de son contenu (design § 6). */
export default function ProjectLoading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="container mx-auto max-w-3xl px-4 pt-28 pb-24"
    >
      <span className="sr-only">Chargement du projet</span>
      <div className="flex flex-col gap-8">
        <div className="flex h-[34px] items-center">
          <Skeleton className="h-6 w-2/5" />
        </div>
        <div className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-2">
          {['w-full', 'w-1/3', 'w-1/4', 'w-3/5'].map((width) => (
            <div key={width} className="contents">
              <div className="flex h-[22px] items-center">
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="flex h-[22px] items-center">
                <Skeleton className={`h-3 ${width}`} />
              </div>
            </div>
          ))}
        </div>
        <div className="aspect-video chamfer-lg dot-grid" />
      </div>
    </div>
  );
}
