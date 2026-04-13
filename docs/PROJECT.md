# Spirit Song Book

A web application for browsing, searching, and sharing hymns and songs — built for the RCCG (Redeemed Christian Church of God) community. Users can explore dual collections (RCCG Hymn Book and Praise & Worship Songs), search by title, number, or lyrics, filter by category, copy lyrics to clipboard, and download them as formatted PDFs.

---

## Tech Stack

| Layer              | Technology                          |
| ------------------ | ----------------------------------- |
| **Framework**      | Next.js 16 (App Router, React 19)  |
| **Language**       | TypeScript 5                        |
| **Database**       | MongoDB via Mongoose 9              |
| **Styling**        | Tailwind CSS 4 with PostCSS        |
| **PDF Generation** | jsPDF                               |
| **Image Storage**  | Cloudinary                          |
| **Linting**        | ESLint 9 with Next.js config       |
| **Deployment**     | Vercel (serverless-ready)           |

---

## Features

- **Dual Collections** — RCCG Hymn Book and Praise & Worship Songs as separate browsable songbooks.
- **Full-Text Search** — Search by title, author, hymn/song number, or lyrics content using MongoDB weighted text indexes.
- **Category Filtering** — Browse hymns and songs by category (e.g. Praise, Thanksgiving).
- **Structured Lyrics Display** — Formatted verses, choruses, tunes/sol-fa notes, Bible references, and history.
- **Copy & PDF Export** — Copy lyrics to clipboard or download as a formatted PDF with page breaks.
- **Pagination** — 24 items per page on list views.
- **Dark Mode** — Automatic dark theme via `prefers-color-scheme`.
- **PWA** — Installable as a standalone app with manifest, icons, and Apple Web App support.
- **Responsive Design** — Mobile-first layout using Tailwind utilities.

---

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata, header)
│   ├── page.tsx            # Home — songbook selector
│   ├── api/                # API route handlers
│   │   ├── categories/     # GET hymn categories
│   │   ├── hymns/          # GET hymns list & detail
│   │   └── songs/          # GET songs list, detail & categories
│   ├── hymns/              # Hymn pages (list + detail)
│   └── songs/              # Song pages (list + detail)
├── components/             # Reusable UI components
├── lib/
│   ├── db.ts               # MongoDB connection (serverless cached)
│   ├── models/             # Mongoose schemas (Hymn, Song, SongBook)
│   └── services/           # External services (Cloudinary)
└── types/                  # TypeScript interfaces
```

The app uses **server components** for data fetching on list and detail pages, and **client components** for interactive UI (search bar, category filter, copy/download actions). The MongoDB connection is cached across serverless invocations to avoid pool exhaustion on Vercel.

---

## Data Models

### Hymn

| Field            | Type              | Notes                              |
| ---------------- | ----------------- | ---------------------------------- |
| `hymnNumber`     | `number`          | Unique, indexed                    |
| `title`          | `string`          | Text-indexed (weight: 10)          |
| `author`         | `string \| null`  | Text-indexed (weight: 5)           |
| `category`       | `string \| null`  | Indexed                            |
| `bibleReference` | `string \| null`  |                                    |
| `history`        | `string \| null`  |                                    |
| `numberOfVerses` | `number`          |                                    |
| `chorus`         | `object`          | `{ qualifier?, text? }`            |
| `verses`         | `array`           | `[{ number, qualifier?, text }]`   |
| `tunes`          | `array`           | `[{ name?, author?, audioUrl? }]`  |
| `musicSheetUrl`  | `string \| null`  |                                    |
| `createdAt`      | `Date`            | Auto-managed                       |
| `updatedAt`      | `Date`            | Auto-managed                       |

**Indexes:** unique on `hymnNumber`, standard on `category`, compound text index on `title`, `author`, `verses.text`, `chorus.text` with relevance weights.

### Song

Same structure as Hymn but uses `songNumber` instead of `hymnNumber`.

### SongBook

| Field        | Type                   | Notes              |
| ------------ | ---------------------- | ------------------ |
| `name`       | `string`               | Unique             |
| `logo`       | `string`               | Cloudinary URL     |
| `totalSongs` | `number`               |                    |
| `type`       | `enum(SONG \| HYMN)`   |                    |
| `routePath`  | `string`               | Unique             |
| `createdAt`  | `Date`                 | Auto-managed       |
| `updatedAt`  | `Date`                 | Auto-managed       |

---

## API Endpoints

All endpoints are `GET` only.

### Hymns

| Endpoint               | Description                        | Query Parameters                             |
| ---------------------- | ---------------------------------- | -------------------------------------------- |
| `GET /api/hymns`       | List hymns with search & filtering | `q`, `category`, `page`, `limit` (max 100)  |
| `GET /api/hymns/:number` | Get full hymn by number          | —                                            |
| `GET /api/categories`  | List unique hymn categories        | —                                            |

### Songs

| Endpoint                     | Description                        | Query Parameters                             |
| ---------------------------- | ---------------------------------- | -------------------------------------------- |
| `GET /api/songs`             | List songs with search & filtering | `q`, `category`, `page`, `limit` (max 100)  |
| `GET /api/songs/:number`     | Get full song by number            | —                                            |
| `GET /api/songs/categories`  | List unique song categories        | —                                            |

**Search behavior:** Numeric queries match by hymn/song number or fall back to full-text search. Text queries use MongoDB text indexes with relevance scoring.

**Response shape (list):**
```json
{
  "hymns": [ ... ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 24,
    "totalPages": 5
  }
}
```

---

## Pages

| Route              | Description                                     |
| ------------------ | ----------------------------------------------- |
| `/`                | Home — displays available songbooks to browse   |
| `/hymns`           | Hymn listing with search, category filter, pagination |
| `/hymns/[number]`  | Individual hymn with full lyrics display         |
| `/songs`           | Song listing with search, category filter, pagination |
| `/songs/[number]`  | Individual song with full lyrics display         |

---

## UI Components

| Component          | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `Header`           | Sticky navigation bar with logo and links to Hymns/Songs          |
| `SearchBar`        | Client-side search input with real-time URL syncing & loading state |
| `CategoryFilter`   | Dropdown/modal drawer for filtering by category                   |
| `HymnCard`/`SongCard` | List item card showing number badge, title, author, category  |
| `HymnLyrics`/`SongLyrics` | Formatted lyrics display (verses, chorus, tunes, history) |
| `HymnActions`/`SongActions` | Action bar for copy-to-clipboard and PDF download          |

---

## Environment Variables

| Variable                 | Description                |
| ------------------------ | -------------------------- |
| `MONGODB_URI`            | MongoDB connection string  |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name      |
| `CLOUDINARY_API_KEY`     | Cloudinary API key         |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret      |

---

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start local development server           |
| `npm run build`   | Create production build                  |
| `npm run start`   | Start production server                  |
| `npm run lint`    | Run ESLint                               |
| `npm run migrate` | Run SQLite → MongoDB migration script    |

---

## PWA

The app is installable as a Progressive Web App via `public/manifest.json`:

- **Display:** Standalone (app-like, no browser chrome)
- **Theme Color:** `#2e3192` (RCCG navy)
- **Icons:** 192×192 and 512×512 PNG
- **Apple Web App:** Supported with custom status bar styling
