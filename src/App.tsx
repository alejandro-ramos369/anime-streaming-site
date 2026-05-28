import React, { useState, useEffect } from 'react'
import './index.css'
import SearchBar from './components/SearchBar'
import AnimeGrid from './components/AnimeGrid'
import AnimeDetail from './components/AnimeDetail'
import { fetchAnimeList, searchAnime } from './services/animeService'

interface Anime {
  id: string
  title: string
  image: string
  year?: number
  type?: string
  status?: string
  episodes?: number
}

function App() {
  const [animes, setAnimes] = useState<Anime[]>([])
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadPopularAnimes()
  }, [])

  const loadPopularAnimes = async () => {
    setLoading(true)
    try {
      const data = await fetchAnimeList()
      setAnimes(data)
    } catch (error) {
      console.error('Failed to load anime list:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      loadPopularAnimes()
      return
    }

    setLoading(true)
    try {
      const results = await searchAnime(query)
      setAnimes(results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAnime = (anime: Anime) => {
    setSelectedAnime(anime)
  }

  const handleBackToList = () => {
    setSelectedAnime(null)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-white">🎌 AnimeWatch</h1>
            <p className="text-gray-400 text-sm">Free Anime Streaming</p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedAnime ? (
          <AnimeDetail anime={selectedAnime} onBack={handleBackToList} />
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Anime'}
              </h2>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
              </div>
            ) : animes.length > 0 ? (
              <AnimeGrid animes={animes} onSelectAnime={handleSelectAnime} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No anime found. Try a different search.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-400 text-center text-sm">
            © 2024 AnimeWatch. All anime data is sourced from public APIs. No ads, completely free.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
