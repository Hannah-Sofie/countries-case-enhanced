# Countries Case Enhanced

An enhanced version of a countries API case built with React and Node.js/Express.

## Live demo

- Frontend: https://countries-case-enhanced.vercel.app/
- Backend: https://countries-case-enhanced-production.up.railway.app/api/countries

## Features

- Fetch 10 random countries from an external API
- Fetch new countries with a button
- Search countries by name
- Filter countries by continent
- Sort countries by name and population
- Loading, error, and empty-state handling

## Tech Stack

- React (Vite)
- JavaScript
- CSS
- Node.js
- Express

## Project Structure

client/ → frontend (React)  
server/ → backend (Node.js / Express)

## Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Hannah-Sofie/countries-case-enhanced.git
cd countries-case-enhanced
```

---

### 2. Setup backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and add your API key:

```bash
cp .env.example .env
```

Start backend:

```bash
npm start
```

---

### 3. Setup frontend

```bash
cd client
npm install
```

Copy `.env.example` to `.env` and adjust if needed:

```bash
cp .env.example .env
```

Start frontend:

```bash
npm run dev
```

---

## Notes

- The backend acts as a proxy to the external API
- The API key is stored in a `.env` file and is not exposed in the frontend
- The app supports combined search, filtering, and sorting

## Deployment

- Frontend is deployed on Vercel
- Backend is deployed on Railway
