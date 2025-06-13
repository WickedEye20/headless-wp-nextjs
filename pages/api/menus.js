import { getMenus } from '../../lib/getMenus';

export default async function handler(req, res) {
  try {
    const menus = await getMenus();
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
