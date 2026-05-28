# AnimeWatch - Free Anime Streaming Website

A modern, ad-free anime streaming website built with React, TypeScript, and TailwindCSS. Browse and search your favorite anime with a clean, responsive interface.

## Features

- 🔍 **Search Functionality** - Find anime by title
- 📺 **Browse Popular Anime** - Discover trending series
- 📋 **Anime Details** - View comprehensive information about each anime
- 📺 **Episode Lists** - Browse all episodes for each series
- 🎨 **Beautiful UI** - Modern dark theme optimized for anime viewing
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✨ **No Ads** - Completely ad-free experience

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: TailwindCSS 4 for responsive design
- **Build Tool**: Vite for fast development and production builds
- **Data Source**: AniList GraphQL API (official anime database)
- **HTTP Client**: Axios for API requests

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anime-streaming-site.git
cd anime-streaming-site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Project Structure

```
anime-streaming-site/
├── src/
│   ├── components/
│   │   ├── SearchBar.tsx      # Search input component
│   │   ├── AnimeGrid.tsx      # Grid display of anime cards
│   │   └── AnimeDetail.tsx    # Detailed anime view with episodes
│   ├── services/
│   │   └── animeService.ts    # AniList API integration
│   ├── App.tsx                # Main application component
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles with TailwindCSS
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # TailwindCSS configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## API Integration

The application uses the **AniList GraphQL API** to fetch anime data. This is a free, public API that provides:

- Comprehensive anime database with metadata
- Search functionality
- Episode information
- Detailed descriptions, genres, and studios

No authentication is required for basic queries.

## Features in Detail

### Search
Search for anime by title with real-time results from the AniList database.

### Browse
Discover popular and trending anime series with beautiful cover images.

### Details
View comprehensive information about each anime including:
- Title and alternative titles
- Year of release
- Type (TV, Movie, OVA, etc.)
- Status (Airing, Finished, etc.)
- Episode count
- Description
- Genres
- Studios

### Episodes
Browse and select episodes for each anime series.

## Deployment

This is a static React application and can be deployed to any static hosting service:

- **Vercel** - Recommended for fastest deployment
- **Netlify** - Great alternative with free tier
- **GitHub Pages** - Free hosting for static sites
- **AWS S3 + CloudFront** - Scalable solution
- **Firebase Hosting** - Google's hosting platform

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized bundle size (~80KB gzipped)
- Fast load times with Vite
- Responsive images with lazy loading
- Efficient API calls with caching

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Disclaimer

This project is for educational purposes. Anime data is sourced from the public AniList API. This application does not host or stream any video content directly.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ for anime fans**
