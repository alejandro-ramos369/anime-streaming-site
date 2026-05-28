import axios from 'axios'

const ANILIST_API = 'https://graphql.anilist.co'

// GraphQL query for popular anime
const POPULAR_ANIME_QUERY = `
  query {
    Page(page: 1, perPage: 20) {
      media(sort: POPULARITY_DESC, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        startDate {
          year
        }
        format
        status
        episodes
        description
      }
    }
  }
`

// GraphQL query for searching anime
const SEARCH_ANIME_QUERY = `
  query($search: String) {
    Page(page: 1, perPage: 20) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        startDate {
          year
        }
        format
        status
        episodes
        description
      }
    }
  }
`

// GraphQL query for anime details
const ANIME_DETAILS_QUERY = `
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      startDate {
        year
      }
      format
      status
      episodes
      description
      genres
      studios {
        nodes {
          name
        }
      }
    }
  }
`

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
}

export const fetchAnimeList = async (): Promise<Anime[]> => {
  try {
    const response = await axios.post(ANILIST_API, {
      query: POPULAR_ANIME_QUERY,
    })

    const animes = response.data.data.Page.media.map((anime: any) => ({
      id: anime.id.toString(),
      title: anime.title.english || anime.title.romaji,
      image: anime.coverImage.large,
      year: anime.startDate.year,
      type: anime.format,
      status: anime.status,
      episodes: anime.episodes,
    }))

    return animes
  } catch (error) {
    console.error('Error fetching anime list:', error)
    return []
  }
}

export const searchAnime = async (query: string): Promise<Anime[]> => {
  try {
    const response = await axios.post(ANILIST_API, {
      query: SEARCH_ANIME_QUERY,
      variables: {
        search: query,
      },
    })

    const animes = response.data.data.Page.media.map((anime: any) => ({
      id: anime.id.toString(),
      title: anime.title.english || anime.title.romaji,
      image: anime.coverImage.large,
      year: anime.startDate.year,
      type: anime.format,
      status: anime.status,
      episodes: anime.episodes,
    }))

    return animes
  } catch (error) {
    console.error('Error searching anime:', error)
    return []
  }
}

export const fetchAnimeDetails = async (id: string): Promise<any> => {
  try {
    const response = await axios.post(ANILIST_API, {
      query: ANIME_DETAILS_QUERY,
      variables: {
        id: parseInt(id),
      },
    })

    const anime = response.data.data.Media
    return {
      id: anime.id,
      title: anime.title.english || anime.title.romaji,
      image: anime.coverImage.large,
      year: anime.startDate.year,
      type: anime.format,
      status: anime.status,
      episodes: anime.episodes,
      description: anime.description,
      genres: anime.genres,
      studios: anime.studios?.nodes?.map((s: any) => s.name) || [],
    }
  } catch (error) {
    console.error('Error fetching anime details:', error)
    return null
  }
}

export const fetchEpisodes = async (id: string): Promise<Episode[]> => {
  try {
    // Generate mock episodes based on the anime's episode count
    const response = await axios.post(ANILIST_API, {
      query: ANIME_DETAILS_QUERY,
      variables: {
        id: parseInt(id),
      },
    })

    const episodeCount = response.data.data.Media.episodes || 12
    const episodes: Episode[] = []

    for (let i = 1; i <= Math.min(episodeCount, 50); i++) {
      episodes.push({
        id: `ep-${i}`,
        number: i,
        title: `Episode ${i}`,
      })
    }

    return episodes
  } catch (error) {
    console.error('Error fetching episodes:', error)
    return []
  }
}
