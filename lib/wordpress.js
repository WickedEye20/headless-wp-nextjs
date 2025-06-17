// WordPress REST API utility functions
// All WordPress-related network requests should live in this module so that they are easy to
// share, maintain and optimise (e.g. caching, error handling).
//
// Environment variables expected (all **NEXT_PUBLIC** so they are exposed to the browser):
//  - NEXT_PUBLIC_WP_REST_URL:       e.g. https://demo.site.com/wp-json/wp/v2/posts?_embed
//  - NEXT_PUBLIC_WP_REST_MEDIA_URL: e.g. https://demo.site.com/wp-json/wp/v2/media
//  - NEXT_PUBLIC_WP_REST_PAGES_URL: e.g. https://demo.site.com/wp-json/wp/v2/pages
//  - NEXT_PUBLIC_WP_MENUS_URL:      e.g. https://demo.site.com/wp-json/menus/v1/menus
//
// NOTE: Do **NOT** import `fs` or other Node-only packages here – this file is executed on the
// browser as well as the server.

/**
 * Generic helper that performs a fetch and ensures a successful response.
 * The returned value is already parsed JSON.
 */
async function fetchJson(url, init = {}) {
  const res = await fetch(url, init);
  if (!res.ok) {
    // Attempt to extract WP error message structure if present
    let reason = res.statusText;
    try {
      const data = await res.json();
      if (data && data.message) reason = data.message;
    } catch (_) {
      /* ignore json parse error */
    }
    throw new Error(`WordPress fetch failed (${res.status}): ${reason}`);
  }
  return res.json();
}

/*******************
 * Media Endpoints *
 *******************/
const MEDIA_BASE =
  process.env.NEXT_PUBLIC_WP_REST_MEDIA_URL?.replace(/\/$/, "") || ""; // ensure no trailing slash

/**
 * Fetch a single media item (attachment) by its numeric ID.
 * @param {number|string} id – WP attachment ID
 * @returns {Promise<object>} WordPress media object
 */
export async function getMedia(id) {
  if (!id && id !== 0) throw new Error("Media ID is required");
  return fetchJson(`${MEDIA_BASE}/${id}`);
}

/**
 * Convenience helper that directly returns the source URL of an attachment.
 * @param {number|string} id – WP attachment ID
 * @returns {Promise<string>} absolute URL to media file
 */
export async function getMediaUrl(id) {
  const item = await getMedia(id);
  return item?.source_url || "";
}

/******************
 * Posts Endpoints *
 ******************/
const POSTS_BASE = (() => {
  // The provided env variable normally already contains `?_embed`, we strip that so callers can
  // decide whether they want embeds.
  const envVal = process.env.NEXT_PUBLIC_WP_REST_POST_URL || "";
  return envVal.replace(/\/posts\?.*$/, "/posts");
})();

export async function getPosts(params = "?_embed") {
  return fetchJson(`${POSTS_BASE}${params}`);
}

export async function getPostBySlug(slug, params = "&_embed") {
  if (!slug) throw new Error("Slug is required");
  const items = await fetchJson(`${POSTS_BASE}?slug=${encodeURIComponent(slug)}${params}`);
  return items[0] || null;
}

/******************
 * Pages Endpoints *
 ******************/
const PAGES_BASE =
  process.env.NEXT_PUBLIC_WP_REST_PAGES_URL?.replace(/\/$/, "") || `${POSTS_BASE.replace(/\/posts$/, "")}/pages`;

export async function getPages(params = "") {
  return fetchJson(`${PAGES_BASE}${params}`);
}

export async function getPageBySlug(slug, params = "") {
  if (!slug) throw new Error("Slug is required");
  const items = await fetchJson(`${PAGES_BASE}?slug=${encodeURIComponent(slug)}${params}`);
  return items[0] || null;
}

/******************
 * Menus Endpoints *
 ******************/
const MENUS_URL =
  process.env.NEXT_PUBLIC_WP_MENUS_URL?.replace(/\/$/, "") ||
  "https://demo.parkdistrictrec.com/wp-json/menus/v1/menus";

export async function getMenus() {
  return fetchJson(MENUS_URL);
}

export async function getMenuBySlug(slug) {
  if (!slug) throw new Error("Menu slug is required");
  const menus = await getMenus();
  return menus.find((menu) => menu.slug === slug) || null;
}

/***********************
 * Gravity Forms helper *
 ***********************/
// Uses the local Next.js API routes that proxy requests to the WP Gravity Forms REST API.
export async function getGravityForm(formId = 1) {
  if (!formId) throw new Error("formId is required");
  const res = await fetch(`/api/gf/forms?formId=${formId}`);
  if (!res.ok) throw new Error(`Failed to load form ${formId}`);
  return res.json();
}

// Re-export generic helper so other modules can create bespoke queries if needed.
export { fetchJson as fetchWp };
