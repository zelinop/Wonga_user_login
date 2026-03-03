# User Login Frontend (React + Vite)

Frontend implementation for the assessment login flow.

## What this app includes

- Register page with required fields:
	- First name
	- Last name
	- Email
	- Password
- Login page with required fields:
	- Email
	- Password
- User details page (protected):
	- First name
	- Last name
	- Email
- Route protection for authenticated users only
- Error feedback with toast + modal patterns

## Tech stack

- React
- React Router
- Vite
- ESLint

## Prerequisites

- Node.js 18+
- npm 9+

## Environment variables

Create a `.env` file in the project root:

```bash
VITE_USER_API_URL=http://localhost:5000/users
```

`VITE_USER_API_URL` should point to the backend users API base endpoint.

## Run locally

```bash
npm install
npm run start
```

App runs on:

```text
http://localhost:3001
```

## Available scripts

- `npm run start` — start development server on port 3001
- `npm run dev` — start Vite dev server
- `npm run build` — create production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Frontend structure

- `src/pages` — page components
- `src/pages/hooks` — page-level business logic hooks
- `src/features/auth` — auth context, hooks, entities, services
- `src/shared/components` — reusable UI components
- `src/shared/context` + `src/shared/hooks` — feedback state and hooks
- `src/routes` — route config and auth guards

## Authentication behavior

- Unauthenticated users are redirected to `/login` when trying to access protected routes.
- Successful login/register navigates to `/welcome`.
- Missing session on the user details screen triggers a warning toast and redirects to login.

## Notes

- This repository currently focuses on the frontend scope of the assessment.
