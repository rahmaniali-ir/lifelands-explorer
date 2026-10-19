"use client"

import { Button } from "@/components/ui/button"

interface GamesErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GamesError({ error, reset }: GamesErrorProps) {
  return (
    <main className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4 py-8 text-center">
      <h1 className="text-2xl font-bold">بارگذاری بازی‌ها ناموفق بود</h1>

      <p className="max-w-md text-sm text-muted-foreground">
        مشکلی در دریافت اطلاعات پیش آمد. لطفاً دوباره تلاش کنید.
      </p>

      <p>{error.message}</p>

      <Button onClick={reset}>تلاش مجدد</Button>
    </main>
  )
}
