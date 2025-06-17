// Fetches menus from the WordPress REST API (requires WP REST API Menus plugin)
import { getMenus as fetchMenus } from './wordpress';

// Deprecated: keep this wrapper so existing imports continue to work.
export async function getMenus() {
  return fetchMenus();
}
