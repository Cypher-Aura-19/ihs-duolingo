const Skeleton = ({ className }: { className: string }) => (
  <div
    className={`animate-pulse rounded-xl bg-[#e9e4d9] motion-reduce:animate-none ${className}`}
  />
);

const Loading = () => {
  return (
    <div className="mx-auto max-w-[1160px] px-4 pb-16 sm:px-6" aria-busy="true">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,760px)_320px]">
        <div>
          <div className="flex items-center gap-3 border-b border-[#e3ded2] py-4">
            <Skeleton className="h-10 w-10" />
            <div>
              <Skeleton className="h-6 w-28" />
              <Skeleton className="mt-2 h-3 w-24" />
            </div>
          </div>

          <Skeleton className="mt-5 h-44 w-full" />
          <div className="mx-auto mt-8 flex max-w-[420px] flex-col items-center gap-8">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className={`flex w-full items-center gap-4 ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <Skeleton className="h-20 w-36" />
                <Skeleton className="h-20 w-20 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden space-y-5 xl:block">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-[390px] w-full" />
          <Skeleton className="h-[260px] w-full" />
        </div>
      </div>
      <span className="sr-only">Loading learning path</span>
    </div>
  );
};

export default Loading;
