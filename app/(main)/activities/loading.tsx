const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse rounded-xl bg-[#e9e4d9] motion-reduce:animate-none ${className}`}
  />
);

export default function ActivitiesLoading() {
  return (
    <div className="mx-auto max-w-[1120px] px-4 pb-16 sm:px-6" aria-busy="true">
      <div className="flex min-h-16 items-center border-b border-[#e3ded2]">
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_220px]">
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12" />
          <div className="flex-1">
            <Skeleton className="h-7 w-2/3" />
            <Skeleton className="mt-3 h-4 w-full" />
          </div>
        </div>
        <Skeleton className="h-16 w-full" />
      </div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <Skeleton className="h-[540px] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-44 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
      <span className="sr-only">Loading practice activity</span>
    </div>
  );
}
