# Headless WordPress + Next.js Starter

A lightweight boilerplate for building modern React front-ends on top of an existing WordPress installation.  It relies **solely** on the public WordPress REST API – no GraphQL, no additional PHP code required.

This template provides a minimal setup for building a headless WordPress site using Next.js and Advanced Custom Fields (ACF) via the WordPress REST API.

## Requirements

• WordPress 5.0+ with the default REST API enabled.
• Node.js 18 LTS or newer.

1. WordPress installation with:
   - [ACF](https://www.advancedcustomfields.com/)
   - [ACF to REST API](https://github.com/airesvsg/acf-to-rest-api) (for exposing ACF fields via REST)
   - REST API enabled (default in WordPress)
2. Node.js (>=18) installed locally.

## Quick Start

1. Clone the repo or copy these files.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:

   ```env
   NEXT_PUBLIC_WP_REST_URL=https://your-site.com/wp-json/wp/v2/posts?_embed
   NEXT_PUBLIC_WP_DOMAIN=your-site.com
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to see the site.

## Environment Variables
Create a `.env.local` file in the project root and provide the following keys:

| Key | Example | Description |
|-----|---------|-------------|
| `NEXT_PUBLIC_WP_REST_POST_URL` | `https://demo.parkdistrictrec.com/wp-json/wp/v2/posts?_embed` | Base REST endpoint for posts. The helper strips query params as needed. |
| `NEXT_PUBLIC_WP_REST_MEDIA_URL` | `https://demo.parkdistrictrec.com/wp-json/wp/v2/media` | Media attachments endpoint. |
| `NEXT_PUBLIC_WP_REST_PAGES_URL` | `https://demo.parkdistrictrec.com/wp-json/wp/v2/pages` | Pages endpoint. |
| `NEXT_PUBLIC_WP_MENUS_URL` | `https://demo.parkdistrictrec.com/wp-json/headless/v1/menus` | WP REST Menus plugin endpoint. |
| `GF_API_URL` | `https://demo.parkdistrictrec.com/wp-json/gf/v2` | Gravity Forms API endpoint. |

> Only the *public* keys are required because all REST calls happen client-side.

To fetch ACF fields, ensure you have the ACF to REST API plugin enabled in WordPress. ACF fields will be available under the `acf` key in the REST API response for posts, e.g.:

```json
{
  "id": 123,
  "title": { "rendered": "Post Title" },
  "acf": {
    "custom_field": "value"
  }
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Next.js in development mode on <http://localhost:3000>. |
| `npm run build` | Create an optimized production build. |
| `npm start` | Start the production server (after `build`). |

## Deployment
Push to any platform that supports a static Next.js build (Vercel, Netlify, etc.).  No special configuration is required beyond the env vars above.

This project can be easily deployed to platforms like Vercel or Netlify.

## Notable Folders

```
components/   → Reusable React components (e.g. WpMediaImage, Layout)
lib/          → API helpers (all WordPress calls live in lib/wordpress.js)
pages/        → Next.js routes and API proxies
public/       → Static assets
```

- `pages/` – Next.js pages
- `lib/wordpress.js` – (API calls of WordPress)
- `next.config.js` – Next.js configuration

---

Made with ❤️ & Next.js.  PRs welcome!
