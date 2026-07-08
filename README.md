# شركة قمم اليقين للمحاماة والاستشارات القانونية

**Qimam Al-Yaqin Law Firm & Legal Consultations** — Premium law firm website built with Next.js 16, TypeScript, Tailwind CSS v4, and Prisma v7.

A production-ready, full-stack website for a Saudi law firm based in Makkah, featuring a custom headless CMS, consultation booking system, and comprehensive admin dashboard.

## Technology Stack

### Frontend
- **Next.js 16** (App Router, React Server Components, TypeScript strict)
- **Tailwind CSS v4** with custom design-token theme
- **Framer Motion** for premium animations and micro-interactions
- **Lucide React** for premium line icons
- **Radix UI** primitives (accessible, unstyled headless components)
- **Zod** for shared client/server validation

### Backend
- **Next.js Route Handlers / Server Actions** (API layer)
- **PostgreSQL** via **Prisma v7** (schema-first ORM with driver adapter)
- **Redis** (ioredis) for caching and rate-limiting
- **NextAuth.js v5** (Auth.js) — credentials-based auth with RBAC
- **Nodemailer** for transactional emails
- **Zod** validation on all input boundaries

### CMS / Admin
- Fully custom-built headless CMS within the Next.js app
- Role-based access: SUPER_ADMIN, ADMIN, EDITOR, VIEWER
- Content models: Pages, Blog, Case Studies, Practice Areas, Services, Testimonials, FAQs, Consultations, Contacts, Media, SEO Settings

## Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema (18 models)
│   └── seed.ts                # Initial data seed (Arabic content)
├── prisma.config.ts           # Prisma v7 configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout (RTL, fonts, JSON-LD)
│   │   ├── page.tsx           # Home page
│   │   ├── about/             # About the firm
│   │   ├── lawyer/            # Lawyer profile
│   │   ├── services/          # Services overview
│   │   ├── practice-areas/    # Practice areas (index + [slug])
│   │   ├── blog/              # Blog (index + [slug])
│   │   ├── case-studies/      # Case studies (index + [slug])
│   │   ├── testimonials/      # Testimonials wall
│   │   ├── faq/               # FAQ with search
│   │   ├── careers/           # Careers / job applications
│   │   ├── consultation/      # Multi-step booking form
│   │   ├── contact/           # Contact with map + form
│   │   ├── privacy-policy/    # PDPL-compliant privacy policy
│   │   ├── terms-of-service/  # Terms of service
│   │   ├── admin/             # Admin dashboard (CMS)
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # Design system components
│   │   ├── layout/            # Header, Footer
│   │   ├── home/              # Home page sections
│   │   ├── admin/             # Admin sidebar, header
│   │   └── shared/            # Shared widgets
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # NextAuth v5 configuration
│   │   └── utils.ts           # cn() utility
│   ├── middleware.ts           # Admin route protection
│   └── types/                 # TypeScript type declarations
├── .env.example               # Environment variables template
├── docker-compose.yml         # Local dev with Postgres + Redis
└── next.config.ts             # Next.js configuration
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ (or a managed provider like Neon/Supabase)
- Redis (optional, for rate-limiting features)

### Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | At least 32-char random string for JWT encryption |
| `NEXTAUTH_URL` | Your site URL (e.g., `http://localhost:3000`) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed the database with initial content
npm run db:seed

# Start development server
npm run dev
```

### Creating Admin User

After seeding, create an admin user via Prisma Studio:

```bash
npm run db:studio
```

Or run a direct SQL insert. The password should be hashed with bcrypt. You can use the seed script as a reference.

## Design System

### Colors
- **Primary**: #0B1A2B (deep navy-charcoal)
- **Secondary**: #F8F6F1 (warm ivory)
- **Gold accent**: #B08D57 (muted antique gold)
- Full palette in `src/app/globals.css` with CSS custom properties

### Typography (Arabic-first, RTL)
- **Headings**: IBM Plex Sans Arabic
- **Body**: Tajawal
- **Numerals/Latin**: Inter
- Responsive type scale using `clamp()`

### Premium Features
- Glassmorphism sticky header
- Framer Motion scroll-triggered animations
- Gold gradient underlines and dividers
- Animated counters and timeline
- Testimonials carousel with autoplay
- Floating WhatsApp button with pulse ring
- Custom 404 page with search

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Set environment variables in Vercel dashboard
4. Use managed Postgres (Neon/Supabase) and Redis (Upstash)
5. Deploy — zero configuration needed

### Docker / VPS

```bash
# Build the Docker image
docker build -t qimam-law .

# Run with Docker Compose (Postgres + Redis + App)
docker-compose up -d
```

## Admin Dashboard

Access `/admin/login` with admin credentials.

### Features
- **Dashboard**: Key metrics, recent activity
- **Blog**: CRUD with publish/draft workflow
- **Consultations**: Manage booking requests, status changes
- **Messages**: Contact form inbox
- **Testimonials**: Approval workflow
- **FAQs**: Categorized with reordering
- **Settings**: Working hours, consultation fee, social links

### User Roles
- **SUPER_ADMIN**: Full access including user management
- **ADMIN**: Full content management
- **EDITOR**: Create/edit content but cannot publish
- **VIEWER**: Read-only access

## Client Must Confirm/Update

The following fields are placeholders that the client must complete:

1. **Working hours** — Admin Settings → working_hours
2. **Consultation fee policy** — Admin Settings → consultation_fee
3. **Lawyer's academic credentials** — Lawyer page (CMS-editable fields)
4. **Years of experience / Cases handled** — Stats bar (CMS-editable)
5. **High-resolution logo** — Replace `public/logo.png`
6. **Lawyer's professional photo** — Replace avatar placeholder
7. **Team member profiles** — Admin → Team (for future expansion)
8. **Google Maps API key** — Add to `.env` for embedded map
9. **Social media links** — Admin Settings
10. **Email/SMTP configuration** — For contact form and consultation notifications
11. **Privacy Policy & Terms** — Template text requiring legal review

## SEO

- Arabic-first metadata on every route
- Open Graph / Twitter Card tags
- JSON-LD structured data (Organization, LegalService, Person, Article, FAQPage, BreadcrumbList)
- Auto-generated sitemap.xml and robots.txt
- Local SEO with NAP consistency
- Semantic breadcrumbs

## License

Private — All rights reserved. This project is built for شركة قمم اليقين للمحاماة والاستشارات القانونية.
