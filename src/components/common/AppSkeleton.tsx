import type { AppSkeletonProps } from "@/lib/types";

const base = "animate-pulse bg-gray-200 dark:bg-gray-800 rounded-md";

export default function AppSkeleton({
  variant = "card",
  count = 6,
  className = "",
}: AppSkeletonProps) {
  // ================= CARD =================
  const renderCard = (i: number) => (
    <div key={i} className={`border rounded-lg p-4 space-y-3 ${className}`}>
      <div className={`${base} h-40 w-full`} />
      <div className={`${base} h-4 w-2/3`} />
      <div className={`${base} h-3 w-full`} />
      <div className={`${base} h-3 w-5/6`} />
    </div>
  );

  // ================= ROW =================
  const renderRow = (i: number) => (
    <div
      key={i}
      className={`border rounded-lg p-4 flex justify-between items-center ${className}`}
    >
      <div className="space-y-2 w-full">
        <div className={`${base} h-4 w-1/3`} />
        <div className={`${base} h-3 w-1/2`} />
      </div>

      <div className="flex gap-2">
        <div className={`${base} h-8 w-16`} />
        <div className={`${base} h-8 w-16`} />
      </div>
    </div>
  );

  // ================= SHOW =================
  const renderShow = (i: number) => (
    <div key={i} className={`border rounded-lg p-4 space-y-3 ${className}`}>
      <div className={`${base} h-5 w-1/2`} />
      <div className={`${base} h-4 w-2/3`} />
      <div className={`${base} h-4 w-1/3`} />
      <div className={`${base} h-4 w-1/4`} />
    </div>
  );

  // ================= FULL PAGE =================
  const renderPage = (i: number) => (
    <div key={i} className={`space-y-6 ${className}`}>
      {/* HEADER */}
      <div className="space-y-2">
        <div className={`${base} h-8 w-1/3`} />
        <div className={`${base} h-4 w-1/2`} />
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3">
        <div className={`${base} h-10 w-40`} />
        <div className={`${base} h-10 w-40`} />
        <div className={`${base} h-10 w-40`} />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, j) => (
          <div key={j} className="border rounded-lg p-4 space-y-3">
            <div className={`${base} h-40 w-full`} />
            <div className={`${base} h-4 w-2/3`} />
            <div className={`${base} h-3 w-full`} />
          </div>
        ))}
      </div>
    </div>
  );

  const map = {
    card: renderCard,
    row: renderRow,
    show: renderShow,
    page: renderPage,
  };

  return <>{Array.from({ length: count }).map((_, i) => map[variant](i))}</>;
}
