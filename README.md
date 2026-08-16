# Swornali Jewellers

Premium jewellery commerce and shop-management platform. The repository is a TypeScript monorepo with a Next.js storefront/admin surface and NestJS REST API sharing a PostgreSQL data model through Prisma.

## Architecture

```
frontend/  Next.js App Router customer and protected admin UI
backend/   NestJS API, authentication, Prisma and business modules
```

The API is the system of record. Images are represented by URLs and metadata; a storage adapter (Cloudinary in production) owns binary uploads. Payment providers implement a provider adapter and never expose or persist raw card data.

## Prerequisites

- Node.js 22+
- PostgreSQL 16+ (or compatible hosted PostgreSQL)

## Setup

1. Copy `.env.example` to `backend/.env` and `frontend/.env.local`; keep secrets only in `backend/.env`.
2. Update `DATABASE_URL` to your PostgreSQL database.
3. Install dependencies: `npm install`.
4. Generate Prisma client: `npm run db:generate`.
5. Create the first migration: `npm run prisma:migrate --workspace=backend -- --name init`.
6. Seed development data: `npm run db:seed`.
7. Start the API: `npm run dev:api`.
8. Start the website in another terminal: `npm run dev`.

Open `http://localhost:3000`; the API health check is at `http://localhost:4000/api/health`.

## Development seed account

The seed only creates this account in non-production environments:

- Email: `admin@swornali.local`
- Password: `ChangeMe123!`

Change or remove this account before any public deployment. You can alter the seed credentials in `backend/prisma/seed.ts`.

## API foundation

Implemented initial public endpoints:

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/categories`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

The Prisma schema defines the normalized foundation for products, variants, inventory, carts, wishlists, orders, payments, coupons, verified reviews, custom requests, and notifications. Business modules build on this data model incrementally.

## Security and deployment notes

The API enables Helmet, global input validation, CORS restricted by `FRONTEND_URL`, JWT foundations, Argon2 hashes, and rate limiting. Run behind TLS, replace all development secrets, use managed PostgreSQL with backups, configure Cloudinary, and set production CORS origins before deployment.
