"use client"

import { Button } from "@/components/ui/button"
import { Paginated } from "@/types/api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function Pagination({ pageId, eachPerPage, total }: Paginated) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPages = Math.ceil(total / eachPerPage)

  function goToPage(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("pageId", String(nextPage))

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="صفحه‌ ها"
      className="flex items-center justify-center gap-4"
    >
      <Button
        variant="outline"
        disabled={pageId <= 1}
        onClick={() => goToPage(pageId - 1)}
      >
        قبلی
      </Button>

      <span aria-live="polite" className="text-sm">
        صفحه {pageId} از {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={pageId >= totalPages}
        onClick={() => goToPage(pageId + 1)}
      >
        بعدی
      </Button>
    </nav>
  )
}
