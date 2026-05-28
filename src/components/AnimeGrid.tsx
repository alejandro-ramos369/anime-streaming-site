import React from 'react'

interface Anime {
  id: string
  title: string
  image: string
  year?: number
  type?: string
}

interface AnimeGridProps {
  animes: Anime[]
  onSelectAnime: (anime: Anime) => void
}

export default function AnimeGrid({ animes, onSelectAnime }: AnimeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {animes.map((anime) => (
        <div
          key={anime.id}
          onClick={() => onSelectAnime(anime)}
          className="anime-card group"
        >
          <div className="relative overflow-hidden">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image'
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-lg font-semibold">View Details</p>
              </div>
            </div>
          </div>
          <div className="anime-card-content">
            <h3 className="anime-card-title">{anime.title}</h3>
            <div className="flex justify-between items-center mt-2">
              {anime.year && <span className="anime-card-year">{anime.year}</span>}
              {anime.type && <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{anime.type}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
