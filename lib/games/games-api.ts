import { APIResponse, GameExplorerData, Paginated } from "@/types/api"

interface GetGamesParams {
  pageId?: number
  eachPerPage?: number
  searchValue?: string
}

export async function getGames({
  pageId = 1,
  eachPerPage = 12,
  searchValue = "",
}: GetGamesParams = {}): Promise<Paginated<GameExplorerData>> {
  const params = new URLSearchParams({
    pageId: String(pageId),
    eachPerPage: String(eachPerPage),
    searchValue,
  })

  const response = await fetch(
    `https://lifelands.ir/api/v1/games?${params.toString()}`,
    { next: { revalidate: 300 } }
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status}`)
  }

  const result: APIResponse<Paginated<GameExplorerData>> = await response.json()

  if (!result.state) {
    throw new Error("The games API returned an unsuccessful response.")
  }

  return result.data
}
