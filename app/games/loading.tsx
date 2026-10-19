export default function GamesLoading() {
  return (
    <main
      className="container mx-auto px-4 py-8"
      aria-busy="true"
      aria-label="در حال بارگذاری بازی‌ها"
    >
      <div className="mb-6 h-9 w-32 animate-pulse rounded bg-muted" />

      <div className="mb-6 h-4 w-24 animate-pulse rounded bg-muted" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl border p-3"
          >
            <div className="aspect-video animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
            <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
    </main>
  )
}
