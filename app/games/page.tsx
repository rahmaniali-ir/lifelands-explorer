import { GameExplorer } from "@/components/games/game-explorer"
import { FavoritesProvider } from "@/hooks/use-favorites"
import { getGames } from "@/lib/games/games-api"

interface GamesPageProps {
  searchParams: Promise<{
    pageId?: string
    eachPerPage?: string
    searchValue?: string
    sortBy?: string
    sortOrder?: string
  }>
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const params = await searchParams

  const pageId = Math.max(1, Number(params.pageId) || 1)
  const eachPerPage = Math.min(
    48,
    Math.max(1, Number(params.eachPerPage) || 12)
  )

  const data = await getGames({
    pageId,
    eachPerPage,
    searchValue: params.searchValue ?? "",
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">بازی‌ها</h1>

      <FavoritesProvider>
        <GameExplorer
          games={data.games}
          total={data.total}
          pageId={data.pageId}
          eachPerPage={data.eachPerPage}
        />
      </FavoritesProvider>
    </main>
  )
}
