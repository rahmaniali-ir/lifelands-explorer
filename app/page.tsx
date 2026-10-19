import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gamepad2Icon } from "lucide-react"

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm text-muted-foreground">
        دنیای بازی‌ها، یک قدم نزدیک‌تر
      </p>

      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        بازی بعدی خودتو را پیدا کن
      </h1>

      <p className="max-w-xl text-muted-foreground">
        بازی‌های جدید کشف کن، دسته‌بندی‌ها رو بگرد و بازی‌های موردعلاقه‌ات رو
        پیدا کن.
      </p>

      <Button
        size="lg"
        nativeButton={false}
        className="group/explore"
        render={
          <Link href="/games">
            <Gamepad2Icon className="size-5.5 overflow-visible text-sky-700 transition-all group-hover/explore:scale-120" />
            <span>کاوش بازی‌ها</span>
          </Link>
        }
      />
    </main>
  )
}
