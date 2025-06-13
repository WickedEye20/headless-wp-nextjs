// Fetches menus from the WordPress REST API (requires WP REST API Menus plugin)
export async function getMenus() {
  const res = await fetch(process.env.NEXT_PUBLIC_WP_MENUS_URL || 'https://demo.parkdistrictrec.com/wp-json/menus/v1/menus');
  if (!res.ok) throw new Error('Failed to fetch menus');
  return res.json();
}
