# Taply

Taply is a web app for creating digital business profiles for local businesses. Customers can open a profile from a shared link, NFC card, or QR code to find contact details, hours, services, menus, and review links—all without installing an app.

## Features

- Public business profiles at `/<slug>`, with business contact details and social links.
- Dedicated profile sections for services, menus, and Google review links when a business has that content.
- Per-business profile appearance settings, including colors, fonts, and visibility options.
- Email/password and Google sign-in powered by Supabase Auth.
- Responsive interface built with Next.js, React, Tailwind CSS, and shadcn/ui components.

## Tech stack

- Next.js 16 (App Router) and React 19
- TypeScript and Tailwind CSS 4
- Supabase Auth and Postgres
- npm

## Get started

### Prerequisites

- Node.js 20.9 or later
- npm
- A Supabase project configured with the tables used by the app. The TypeScript database definitions are in [`types/database.ts`](types/database.ts); this repository does not include database migrations.

### Install and configure

1. Clone the repository and install its dependencies:

   ```bash
   git clone https://github.com/zidvsd/taply.git
   cd taply
   npm ci
   ```

2. Create a `.env.local` file in the project root with your Supabase project URL and publishable key:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   ```

   These are public client configuration values; do not put a Supabase service-role key in the browser environment.

3. In Supabase, enable the sign-in providers you plan to use (email/password and, optionally, Google). Add your app's callback URL to the Supabase Auth redirect allowlist:

   ```text
   http://localhost:3000/auth/callback
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). Public business profiles use the `/<slug>` route.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check TypeScript types |
| `npm run format` | Format TypeScript and TSX files with Prettier |

## Get help

- Report bugs or request features in the [GitHub issue tracker](https://github.com/zidvsd/taply/issues).
- For framework and backend setup details, see the [Next.js documentation](https://nextjs.org/docs) and [Supabase documentation](https://supabase.com/docs).
- The project-specific database types are in [`types/database.ts`](types/database.ts).

## Contributing and maintainers

Taply is maintained by [@zidvsd](https://github.com/zidvsd). Contributions are welcome: open an issue to discuss a substantial change, then submit a pull request with a concise description and relevant validation results. Before submitting, run:

```bash
npm run lint
npm run typecheck
npm run build
```

There is no separate contribution guide in the repository yet. Please keep pull requests focused and avoid including credentials or other secrets.
