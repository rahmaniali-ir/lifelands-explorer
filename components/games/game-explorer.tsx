"use client"

import { GameCard } from "@/components/games/game-card"
import { useDebounce } from "@/hooks/use-debounce"
import { filterGames } from "@/lib/games/filter-games"
import {
  isGameSortField,
  sortFieldsDetails,
  sortFieldsDetailsArray,
  SortFieldType,
  sortGames,
  type SortDirection,
} from "@/lib/games/sort-games"
import { parseVendors } from "@/lib/games/utils"
import type { Game, VitrinThirdPartyVendor } from "@/types/api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { Pagination } from "../core/pagination"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { VendorMultiSelect } from "./vendor-multi-select"
import { SearchIcon } from "lucide-react"
import { cn } from "cn"

interface GameExplorerProps {
  games: Game[]
  total: number
  pageId: number
  eachPerPage: number
}

export function GameExplorer({
  games,
  total,
  pageId,
  eachPerPage,
}: GameExplorerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchParamsString = searchParams.toString()

  const urlParams = new URLSearchParams(searchParamsString)
  const queryFromUrl = urlParams.get("searchValue") ?? ""
  const vendorsKey = urlParams.getAll("vendor").join(",")

  const sortBy: SortFieldType = isGameSortField(urlParams.get("sortBy"))
    ? (urlParams.get("sortBy") as SortFieldType)
    : "score"

  const sortOrder: SortDirection =
    urlParams.get("sortOrder") === "asc" ? "asc" : "desc"

  const [query, setQuery] = useState(queryFromUrl)
  const [selectedVendors, setSelectedVendors] = useState<
    VitrinThirdPartyVendor[]
  >(parseVendors(urlParams.getAll("vendor")))

  const debouncedQuery = useDebounce(query, 300)

  function updateVendors(vendors: VitrinThirdPartyVendor[]) {
    const params = new URLSearchParams(searchParamsString)

    params.delete("vendor")

    for (const vendor of vendors) {
      params.append("vendor", vendor)
    }

    params.set("pageId", "1")

    const nextSearchParams = params.toString()

    router.push(
      nextSearchParams ? `${pathname}?${nextSearchParams}` : pathname,
      { scroll: false }
    )
  }

  function updateSort(field: SortFieldType, direction: SortDirection) {
    const params = new URLSearchParams(searchParamsString)

    params.set("sortBy", field)
    params.set("sortOrder", direction)
    params.set("pageId", "1")

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  useEffect(() => {
    const updateQuery = () => {
      setQuery(queryFromUrl)
      setSelectedVendors(parseVendors(vendorsKey.split(",").filter(Boolean)))
    }

    updateQuery()
  }, [queryFromUrl, vendorsKey])

  useEffect(() => {
    // Wait until the user stops typing.
    if (query !== debouncedQuery) return

    const params = new URLSearchParams(searchParamsString)
    const currentSearchValue = params.get("searchValue") ?? ""
    const nextSearchValue = debouncedQuery.trim()

    // Search hasn't changed. Don't reset pagination!
    if (currentSearchValue === nextSearchValue) return

    if (nextSearchValue) {
      params.set("searchValue", nextSearchValue)
    } else {
      params.delete("searchValue")
    }

    // Reset the page only when the search actually changes.
    params.set("pageId", "1")

    const nextSearchParams = params.toString()

    router.replace(
      nextSearchParams ? `${pathname}?${nextSearchParams}` : pathname,
      { scroll: false }
    )
  }, [query, debouncedQuery, searchParamsString, pathname, router])

  const filteredGames = useMemo(
    () => filterGames(games, "", selectedVendors),
    [games, selectedVendors]
  )

  const sortedGames = useMemo(
    () => sortGames(filteredGames, sortBy, sortOrder),
    [filteredGames, sortBy, sortOrder]
  )

  return (
    <section className="space-y-6">
      {/* search, sort, filter */}
      <div className="flex flex-col flex-wrap gap-3 text-nowrap sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="game-search" className="sr-only">
          جست‌وجوی بازی‌ها
        </label>

        <div className="group/search relative">
          <SearchIcon
            className={cn(
              "absolute inset-s-3 top-1/2 size-4 -translate-y-1/2",
              "opacity-50 transition-all duration-300",
              "group-hover/search:scale-115 group-hover/search:opacity-75",
              "group-active/search:scale-100 group-active/search:opacity-100",
              "group-focus-within/search:scale-110 group-focus-within/search:opacity-100",
              "group-focus-within/search:rotate-360 group-focus-within/search:text-sky-500"
            )}
          />

          <input
            id="game-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="نام بازی یا شرکت سازنده را جست‌وجو کنید..."
            autoComplete="off"
            className="h-10 w-full rounded-md border bg-background ps-10 pe-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:max-w-md"
          />
        </div>

        <div className="flex flex-1 items-center gap-2">
          <p
            className="text-sm text-muted-foreground"
            aria-live="polite"
            aria-atomic="true"
          >
            {filteredGames.length} بازی
            {query.trim() || selectedVendors.length > 0
              ? " پیدا شد"
              : ` از ${total} بازی`}
          </p>

          <div className="flex items-center gap-2">
            <Select
              value={sortBy}
              onValueChange={(value) => {
                if (isGameSortField(value)) {
                  updateSort(value, sortOrder)
                }
              }}
            >
              <SelectTrigger id="game-sort">
                <SelectValue placeholder="انتخاب مرتب‌سازی">
                  <small className="text-muted-foreground">
                    مرتب‌سازی بر اساس
                  </small>
                  <span>{sortFieldsDetails?.[sortBy].label}</span>
                </SelectValue>
              </SelectTrigger>

              <SelectContent align="start">
                {sortFieldsDetailsArray.map((sortField) => (
                  <SelectItem key={sortField.value} value={sortField.value}>
                    {sortField.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() =>
                updateSort(sortBy, sortOrder === "desc" ? "asc" : "desc")
              }
              aria-label={
                sortOrder === "desc" ? "مرتب‌سازی صعودی" : "مرتب‌سازی نزولی"
              }
            >
              {sortOrder === "desc" ? "نزولی ↓" : "صعودی ↑"}
            </Button>
          </div>
        </div>

        <VendorMultiSelect value={selectedVendors} onChange={updateVendors} />
      </div>

      {/* results */}
      {sortedGames.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedGames.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </div>

          <Pagination pageId={pageId} eachPerPage={eachPerPage} total={total} />
        </>
      ) : (
        <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed p-8 text-center">
          <h2 className="font-semibold">بازی‌ای پیدا نشد</h2>
          <p className="text-sm text-muted-foreground">
            عبارت جست‌وجو یا فیلترهای انتخاب‌شده را تغییر دهید.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("")
              setSelectedVendors([])
            }}
            className="text-sm font-medium underline underline-offset-4"
          >
            پاک کردن جست‌وجو و فیلترها
          </button>
        </div>
      )}
    </section>
  )
}
