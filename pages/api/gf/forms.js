import { gfFetch } from '../../../lib/gfApi';

export default async function handler(req, res) {
  const { formId } = req.query;
  try {
    if (formId) {
      const data = await gfFetch(`/forms/${formId}`);
      res.status(200).json(data);
    } else {
      const data = await gfFetch('/forms');
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
