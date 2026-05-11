# MiniInstagram Deployment Guide

## Project structure
- `Backend`: Express API and static hosting (`Backend/public`)
- `Frontend`: React + Vite app

## Local setup
1. Backend env:
   - Copy `Backend/.env.example` to `Backend/.env` and fill values.
2. Frontend env:
   - Use `Frontend/.env` with:
     - `VITE_API_URL=http://localhost:3000`
3. Install dependencies:
   - `npm --prefix Backend ci`
   - `npm --prefix Frontend ci`
4. Run:
   - Backend: `npm --prefix Backend run dev`
   - Frontend: `npm --prefix Frontend run dev`

## Render (Backend) setup
Use service root directory: `Backend`

- Build Command:
  - `npm run build`
- Start Command:
  - `npm start`

Required Render environment variables:
- `JWT_SECRET`
- `MONGODB_URI`
- `CLOUD_NAME`
- `API_KEY`
- `API_SECRET`
- `CORS_ORIGIN=https://viraj-hingu.github.io`
- `NODE_ENV=production`

Notes:
- `npm run build` now builds frontend and syncs it to `Backend/public`.
- No manual copy of frontend files is needed.
- You can deploy with `render.yaml` (Blueprint) for one-click setup.

## GitHub Pages (Frontend) setup
1. Repository `Settings > Pages`:
   - Source: `GitHub Actions`
2. Repository `Settings > Secrets and variables > Actions > Variables`:
   - `VITE_API_URL=https://miniinstagram-1.onrender.com`
3. Push to `main` (or run workflow manually):
   - Workflow file: `.github/workflows/deploy-frontend-pages.yml`

Site URL:
- `https://viraj-hingu.github.io/MiniInstagram/`
