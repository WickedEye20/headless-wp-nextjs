# Headless WordPress + Next.js Starter

This template provides a minimal setup for building a headless WordPress site using Next.js and Advanced Custom Fields (ACF) via the WordPress REST API.

## Prerequisites

1. WordPress installation with:
   - [ACF](https://www.advancedcustomfields.com/)
   - [ACF to REST API](https://github.com/airesvsg/acf-to-rest-api) (for exposing ACF fields via REST)
   - REST API enabled (default in WordPress)
2. Node.js (>=18) installed locally.

## Getting Started

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

## Fetching ACF Fields

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

## Deployment

This project can be easily deployed to platforms like Vercel or Netlify.

## Folder Structure

- `pages/` – Next.js pages
- `lib/wordpress.js` – (Unused/empty)
- `next.config.js` – Next.js configuration

Feel free to extend this template!
