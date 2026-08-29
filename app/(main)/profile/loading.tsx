const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse rounded-xl bg-[#e9e4d9] motion-reduce:animate-none ${className}`}
  />
);

export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 pb-16 sm:px-6" aria-busy="true">
      <div className="mb-6 flex items-end justify-between border-b border-[#e8e2d7] pb-5">
        <div>
          <Skeleton className="h-9 w-44" />
          <Skeleton className="mt-2 h-4 w-72 max-w-full" />
        </div>
        <Skeleton className="hidden h-10 w-52 sm:block" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[390px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[430px] w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
      <span className="sr-only">Loading profile</span>
    </div>
  );
}
