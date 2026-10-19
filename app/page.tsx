import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm text-muted-foreground">
        دنیای بازی‌ها، یک قدم نزدیک‌تر
      </p>

      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        بازی بعدی خودت را پیدا کن
      </h1>

      <p className="max-w-xl text-muted-foreground">
        بازی‌های جدید را کشف کن، دسته‌بندی‌ها را بگرد و بازی‌های موردعلاقه‌ات را
        پیدا کن.
      </p>

      <Button
        size="lg"
        nativeButton={false}
        render={<Link href="/games">کاوش بازی‌ها</Link>}
      />
    </main>
  )
}
