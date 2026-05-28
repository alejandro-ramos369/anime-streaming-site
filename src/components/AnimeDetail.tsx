import React, { useState, useEffect } from 'react'
import { fetchAnimeDetails, fetchEpisodes } from '../services/animeService'

interface Anime {
  id: string
  title: string
  image: string
  year?: number
  type?: string
  status?: string
  episodes?: number
}

interface Episode {
  id: string
  number: number
  title: string
  url?: string
}

interface AnimeDetailProps {
  anime: Anime
  onBack: () => void
}

export default function AnimeDetail({ anime, onBack }: AnimeDetailProps) {
  const [details, setDetails] = useState<any>(null)
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadDetails()
  }, [anime.id])

  const loadDetails = async () => {
    setLoading(true)
    try {
      const detailsData = await fetchAnimeDetails(anime.id)
      setDetails(detailsData)

      const episodesData = await fetchEpisodes(anime.id)
      setEpisodes(episodesData)
      if (episodesData.length > 0) {
        setSelectedEpisode(episodesData[0])
      }
    } catch (error) {
      console.error('Failed to load details:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
      >
        <span>←</span>
        <span>Back to List</span>
      </button>

      {/* Anime Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Poster */}
        <div className="md:col-span-1">
          <img
            src={anime.image}
            alt={anime.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x400?text=No+Image'
            }}
          />
        </div>

        {/* Info */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-white mb-4">{anime.title}</h1>

          <div className="space-y-3 text-gray-300 mb-6">
            {anime.year && (
              <p>
                <span className="font-semibold text-white">Year:</span> {anime.year}
              </p>
            )}
            {anime.type && (
              <p>
                <span className="font-semibold text-white">Type:</span> {anime.type}
              </p>
            )}
            {anime.status && (
              <p>
                <span className="font-semibold text-white">Status:</span> {anime.status}
              </p>
            )}
            {anime.episodes && (
              <p>
                <span className="font-semibold text-white">Episodes:</span> {anime.episodes}
              </p>
            )}
          </div>

          {details?.description && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-300 leading-relaxed">
                {details.description.substring(0, 300)}...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Episodes Section */}
      {episodes.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Episodes</h2>

          {/* Video Player */}
          {selectedEpisode && (
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Episode {selectedEpisode.number}: {selectedEpisode.title}</p>
                  <p className="text-gray-500 text-sm">
                    Video player will load streaming sources from available providers
                  </p>
                  <p className="text-yellow-500 text-sm mt-2">
                    ⚠️ Note: Actual streaming requires integration with video providers
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Episode List */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto">
              {episodes.map((episode) => (
                <button
                  key={episode.id}
                  onClick={() => setSelectedEpisode(episode)}
                  className={`p-2 rounded text-center transition-colors ${
                    selectedEpisode?.id === episode.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <p className="text-sm font-medium">Ep {episode.number}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      )}

      {!loading && episodes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No episodes available for this anime.</p>
        </div>
      )}
    </div>
  )
}
