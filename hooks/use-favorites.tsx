"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

const STORAGE_KEY = "lifelands-favorites"

interface FavoritesContextValue {
  favorites: ReadonlySet<string>
  isReady: boolean
  toggleFavorite: (gameId: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const init = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)

        if (stored) {
          const parsed: unknown = JSON.parse(stored)

          if (
            Array.isArray(parsed) &&
            parsed.every((id): id is string => typeof id === "string")
          ) {
            setFavoriteIds([...new Set(parsed)])
          }
        }
      } catch {
        // Ignore invalid or unavailable localStorage data.
      } finally {
        setIsReady(true)
      }
    }

    init()
  }, [])

  const toggleFavorite = useCallback(
    (gameId: string) => {
      if (!isReady) return

      setFavoriteIds((currentIds) => {
        const nextIds = currentIds.includes(gameId)
          ? currentIds.filter((id) => id !== gameId)
          : [...currentIds, gameId]

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextIds))
        } catch {
          // The state still works for this session if storage is unavailable.
        }

        return nextIds
      })
    },
    [isReady]
  )

  const value: FavoritesContextValue = {
    favorites: new Set(favoriteIds),
    isReady,
    toggleFavorite,
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error("useFavorites must be used inside a FavoritesProvider")
  }

  return context
}
