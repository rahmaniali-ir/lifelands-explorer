import type { Game } from "@/types/api"

export const sortFields = [
  "score",
  "runCount",
  "seenCount",
  "like",
] as const satisfies readonly (keyof Game)[]

export type SortFieldType = (typeof sortFields)[number]

export const sortFieldsDetails: Record<
  SortFieldType,
  { value: SortFieldType; label: string }
> = {
  score: { value: "score", label: "امتیاز" },
  runCount: { value: "runCount", label: "تعداد اجرا" },
  seenCount: { value: "seenCount", label: "تعداد بازدید" },
  like: { value: "like", label: "تعداد لایک" },
}

export const sortFieldsDetailsArray = Object.values(sortFieldsDetails)

export type SortDirection = "asc" | "desc"

export function isGameSortField(value: string | null): value is SortFieldType {
  return value !== null && (sortFields as readonly string[]).includes(value)
}

export function sortGames(
  games: readonly Game[],
  field: SortFieldType,
  direction: SortDirection
): Game[] {
  const multiplier = direction === "asc" ? 1 : -1

  return [...games].sort((a, b) => {
    const aValue = a[field] ?? 0
    const bValue = b[field] ?? 0

    return (aValue - bValue) * multiplier
  })
}
