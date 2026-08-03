# Productivity App

A productivity app built as a full stack project utilising all the topics learned in the roadmap — GraphQL for the data layer, Redis sitting in front of Postgres as a cache, REST kept isolated to auth. React + TypeScript on the front, Express + Apollo Server on the back.

## Concepts used / learned

- **GraphQL over REST for app data** — one `/graphql` endpoint handles all task queries and mutations (`tasks`, `addTask`, `updateTask`, `removeTask`, `toggleTask`). REST is only used for `/register`, `/auth`, and `/refresh`
- **Redis as a read-through cache** — `getOrSetCache()` checks Redis first (`tasks:<userId>`), falls back to Postgres on a miss, and every mutation calls `deleteCache()` to invalidate that user's key. 
- **JWT access + refresh token flow** — access token lives in React state (`AuthContext`), never localStorage. Refresh token is set as an **httpOnly cookie** by the server, not stored in JS at all, and there's a dedicated `/refresh` route to reissue access tokens.
- **Axios interceptors for silent token refresh** — request interceptor attaches the bearer token, response interceptor catches a 401, hits `/refresh`, retries the original request once. No need for manual login as long as the refresh token is valid
- **Apollo context per-request auth** — the Express layer verifies the JWT and injects `userId` into the GraphQL context before any resolver runs, so resolvers get userId from context.
- **PostgreSQL with auto-init tables** — `initializeDatabaseUser()` / `initializeDatabaseTasks()` run `CREATE TABLE IF NOT EXISTS` on boot, so there's no separate migration step for a fresh setup.
- **TanStack Query for server state** — `useQuery` + `useMutation` per operation, cache invalidation on success, optimistic updates on the toggle-complete mutation with rollback on error.
- **React Router nested/protected routes** — `ProtectedLayout` guards the `/dashboard/*` route; category pages, calendar, and charts are all separate routed pages instead of one component.
- **MUI theming, FullCalendar, MUI X Charts** — dashboard views, a calendar view, and stat/chart views all pull from the same task data queried by useTasks hook.

## Features

- Add / edit / delete tasks with title, description, due date, priority, and category
- Priority: low / medium / high / urgent
- Category: personal / work / health / finance / social / learning / other
- Toggle complete with optimistic UI (updates instantly, rolls back if the request fails)
- Dashboard views: All, Today, Upcoming, Completed, per-category, Calendar, and Charts
- Live search (debounced client-side filtering)
- Register / login / logout with silent session refresh on page reload
- Redis-cached task list per user, invalidated on every write

## How it works

**Auth (REST):**
`/register` hashes the password with bcrypt and creates a user → `/auth` verifies credentials, returns an access token in the response body, and sets the refresh token as an httpOnly cookie → `/refresh` reads that cookie to reissue a fresh access token without asking the user to log in again.

**Tasks (GraphQL):**
Every task operation goes through a single `POST /graphql`. Express middleware pulls the `Authorization: Bearer <token>` header, verifies it, and passes `userId` into the Apollo context. Resolvers use that `userId`.

**Caching:**
```
Query: check Redis (tasks:<userId>) → hit? return it
                                     → miss? query Postgres, cache the result, return it
Mutation: run the write in Postgres → delete the Redis key for that user
```
Next read is a guaranteed cache miss right after a write, which keeps it simple and avoids stale data.

## Stack

**Frontend:** React 19, TypeScript, MUI, TanStack Query, React Router, Axios, FullCalendar, date-fns
**Backend:** Express 5, Apollo Server, GraphQL, PostgreSQL (`pg`), Redis, JWT, bcrypt

## Running it locally

```bash
git clone https://github.com/sagarsunny24/productivity-app.git
cd productivity-app
npm install
```

You'll need Postgres and Redis running locally. Create a `.env` inside `server/`:

```env
PORT=3000
DB_USER=
DB_HOST=
DB_NAME=
POSTGRES_PASSWORD=
DB_PORT=5432
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

Then:

```bash
# server
cd server
npm install
npm run dev

# frontend (separate terminal, from project root)
npm run dev
```

Tables get created on server start automatically — nothing to migrate before you register your first user.


