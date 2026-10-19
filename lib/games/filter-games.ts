import type { Game, VitrinThirdPartyVendor } from "@/types/api"
import { normalizePersianText } from "../normalize-persian"

export function filterGames(
  games: readonly Game[],
  searchQuery: string,
  selectedVendors: readonly VitrinThirdPartyVendor[] = []
): Game[] {
  const query = normalizePersianText(searchQuery)

  return games.filter((game) => {
    const matchesQuery =
      !query ||
      normalizePersianText(game.title).includes(query) ||
      normalizePersianText(game.companyName).includes(query)

    const matchesVendor =
      selectedVendors.length === 0 ||
      selectedVendors.some((vendor) =>
        game.vitrinThirdPartyVendors.includes(vendor)
      )

    return matchesQuery && matchesVendor
  })
}
