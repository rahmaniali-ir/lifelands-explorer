# Lifelands Game Explorer

A responsive game explorer built with Next.js, allowing users to browse, search, filter, sort, and favorite games from the Lifelands API.

**Live Demo:** [https://lifelands-explorer.vercel.app/](https://lifelands-explorer.vercel.app/)

## Features

- **Game listing:** Fetches and displays games from the Lifelands API.
- **Search:** Search for games by title or company name, with debouncing to avoid unnecessary updates while typing.
- **Vendor filtering:** Filter games by their supported third-party vendors.
- **Sorting:** Sort games by score, run count, view count, and likes, in ascending or descending order.
- **Pagination:** Navigate through the available game pages while preserving the current URL parameters.
- **Favorites:** Add and remove games from favorites, with the selected favorites persisted in `localStorage`.
- **Interactive game cards:** Flip cards to reveal and play available game videos.
- **Loading and error states:** Display image-loading skeletons and fallbacks when images fail to load.
- **URL synchronization:** Keep search, filters, sorting, and pagination reflected in the URL, making it possible to share filtered views and use browser navigation.
- **Responsive UI:** Adapt the game grid and controls to different screen sizes.

## Tech Stack

- **Next.js** with the App Router
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **Lifelands API**
- **Vercel** for deployment

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/rahmaniali-ir/lifelands-explorer
cd lifelands-explorer
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

To verify the production build locally:

```bash
pnpm build
pnpm start
```

## API

The application retrieves game data from the Lifelands API:

`https://lifelands.ir/api/v1/games`

The API provides paginated game data, which the application uses to render the game explorer and its navigation controls.

Game images and videos are served from the Lifelands media domain.

## Implementation Notes

### Search and Debouncing

Search input is debounced to reduce unnecessary URL updates while the user is typing. The search state is synchronized with URL parameters so that the current search can be restored when navigating through browser history or sharing a URL.

### URL State

Search, vendor selection, sorting, and pagination are represented through URL query parameters. This allows the application to preserve its current view across navigation and page refreshes.

### Favorites and Local Storage

Favorite game IDs are stored in the browser's `localStorage`, rather than storing entire game objects. This keeps the stored data small and allows favorites to persist across refreshes and pagination.

### Image and Video Handling

Game images use Next.js's `Image` component, with loading states and error fallbacks. Game videos are rendered using the native HTML `<video>` element and are played when a card is flipped.

## AI Usage

I used AI as a development assistant throughout this project, primarily for the following purposes:

- **Layout and boilerplate generation:** Getting a starting point for parts of the UI, component structure, and repetitive setup code.
- **React hooks and debouncing:** Getting guidance on implementing custom hooks, managing state, and using debouncing for the search experience.
- **Learning Next.js:** Since this is my first Next.js application, I used AI to understand Next.js concepts and patterns, particularly the App Router, Server and Client Components, data fetching, and deployment.
- **Debugging and implementation guidance:** Discussing errors, exploring possible solutions, and understanding how different implementation choices affect the application.

AI-generated suggestions were used as a starting point and were adapted to the project's requirements. I used the process as a learning opportunity to understand the code and the reasoning behind the implementation, rather than treating generated code as a black box.

Thanks, A ; )
