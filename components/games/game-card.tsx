"use client"

import type { Game } from "@/types/api"
import { cn } from "cn"
import {
  Gamepad2Icon,
  GamepadDirectionalIcon,
  HeartIcon,
  StarIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { useFavorites } from "@/hooks/use-favorites"

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const { favorites, isReady, toggleFavorite } = useFavorites()
  const isFavorite = favorites.has(game._id)

  const videoRef = useRef<HTMLVideoElement>(null)

  const [hovered, setHovered] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const flip = () => setFlipped((f) => !f)

  useEffect(() => {
    const handlePlayback = () => {
      const video = videoRef.current

      if (!video) return

      if (!flipped) {
        video.pause()
        return
      }

      setVideoError(false)

      video.play().catch(() => {
        setVideoError(true)
      })
    }

    handlePlayback()
  }, [flipped, game.video])

  return (
    <article
      className="group/gameCard relative size-full animate-appear select-none perspective-midrange hover:z-10"
      onClick={flip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* flipping card */}
      <div
        className={cn(
          "relative size-full rounded-xl transform-3d",
          "transition-transform delay-25 duration-500",
          "group-focus-within/gameCard:outline-4",
          game.video && flipped && !videoError && "rotate-y-180 cursor-zoom-out"
        )}
      >
        {/* card front */}
        <div className="z-10 flex h-full flex-1 flex-col gap-3 overflow-hidden rounded-[inherit] border p-3 transition-colors backface-hidden hover:bg-accent/30">
          <div
            className={cn(
              "group/gameCardImage relative aspect-video overflow-hidden rounded-lg bg-muted transition-transform duration-200",
              game.video && !videoError && "cursor-zoom-in"
            )}
          >
            {game.image ? (
              <Image
                src={`https://dl.lifelands.ir/${game.image}`}
                alt={game.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={cn(
                  "pointer-events-none object-cover transition-transform duration-200 group-hover/gameCard:scale-115",
                  game.video && "group-hover/gameCardImage:scale-120"
                )}
              />
            ) : (
              <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                تصویری موجود نیست
              </div>
            )}
          </div>

          {/* details */}
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="line-clamp-2 font-semibold">{game.title}</h2>

            <p className="text-sm text-muted-foreground">{game.companyName}</p>

            {/* stats */}
            <div className="mt-auto flex flex-wrap gap-2 text-xs text-muted-foreground">
              {/* score */}
              <div className="flex items-center gap-1 rounded-md bg-neutral-100 px-1.5 py-1 dark:bg-neutral-900">
                <StarIcon className="size-4" />
                <span>{game.score}</span>
              </div>

              {/* runCount */}
              <div className="flex items-center gap-1 rounded-md bg-neutral-100 px-1.5 py-1 dark:bg-neutral-900">
                <GamepadDirectionalIcon className="size-4" />
                <span>{game.runCount}</span>
              </div>

              {/* likes & favorite */}
              <div
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(game._id)
                }}
                className="group/gameLike flex cursor-pointer items-center gap-1 rounded-md bg-neutral-100 px-1.5 py-1 dark:bg-neutral-900"
              >
                <HeartIcon
                  className={cn(
                    "size-4 transition-all duration-100",
                    "group-hover/gameLike:scale-110",
                    "group-active/gameLike:scale-90",
                    isFavorite && "fill-current text-rose-600"
                  )}
                />
                <span>{game.like + (isFavorite ? 1 : 0)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* card back */}
        {game.video && (
          <div
            className={cn(
              "absolute inset-0 rotate-y-180 rounded-[inherit] bg-neutral-300 backface-hidden dark:bg-neutral-700"
            )}
          >
            {(hovered || flipped) && !videoError && (
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                src={`https://dl.lifelands.ir/${game.video}`}
                onError={() => setVideoError(true)}
                className="size-full rounded-[inherit] object-cover"
              />
            )}
          </div>
        )}
      </div>

      <Button
        variant="secondary"
        className={cn(
          "glowing-button group/playGame",
          "absolute! inset-e-4 bottom-4 isolate size-16! rounded-full bg-neutral-100",
          "translate-y-4 opacity-0 transition-all duration-200",
          "hover:scale-110",
          game.video && flipped && "translate-y-0 opacity-100",
          "group-hover/gameCard:translate-y-0 group-hover/gameCard:opacity-100",
          "group-active/gameCard:scale-75"
        )}
        nativeButton={false}
        render={
          <Link
            href={"https://lifelands.ir/wgames/luncher?id=" + game._id}
            target="_blank"
          >
            <Gamepad2Icon className="relative size-8 transition-transform group-hover/playGame:scale-125" />
          </Link>
        }
      ></Button>
    </article>
  )
}
