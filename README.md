# Docker Deployment

See DEPLOYMENT.md for full instructions.

Quick start:

```sh
docker-compose up --build
```

Frontend: http://localhost:5173  
Backend: http://localhost:3001  
Database: Postgres on port 5432 (user: postgres, password: postgres, db: glasskitchen)

To stop:

```sh
docker-compose down
```

# Glass Kitchen

Glass Kitchen is a modern web application for managing recipes, ingredients, price lists, and food costing. Built with React, Vite, TypeScript, Tailwind CSS, and shadcn-ui, it provides a fast and intuitive interface for culinary professionals and enthusiasts.

## Project info


**Demo/Production URL**: _[Add your deployed URL here, e.g., https://glass-kitchen.example.com]_ 

**Repository**: https://github.com/yvesdlf/glass-kitchen-master


## Getting Started

To run Glass Kitchen locally:

1. **Clone the repository:**
	```sh
	git clone https://github.com/yvesdlf/glass-kitchen-master.git
	cd glass-kitchen-master
	```
2. **Install dependencies:**
	```sh
	npm install
	# or
	bun install
	```
3. **Start the development server:**
	```sh
	npm run dev
	# or
	bun run dev
	```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Updating the Project

- Make your changes in the `src/` directory (components, pages, data, etc.).
- Use `npm run dev` to preview changes live.
- Commit and push your changes to GitHub.

#### Project Structure

- `src/pages/` — Main application pages (Recipes, Ingredients, Costing, etc.)
- `src/components/` — Reusable UI components
- `src/data/` — Static data (e.g., recipes)
- `src/hooks/` — Custom React hooks
- `src/lib/` — Utility functions


## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)


## Deployment

You can deploy Glass Kitchen using any static hosting provider (e.g., Vercel, Netlify, GitHub Pages):

1. Build the project:
	```sh
	npm run build
	# or
	bun run build
	```
2. Deploy the contents of the `dist/` folder.

_For custom domain setup, refer to your hosting provider's documentation._


## License

MIT
