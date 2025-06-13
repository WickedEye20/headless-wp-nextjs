import { gfFetch } from "../../../lib/gfApi";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { formId, ...fields } = req.body;
  if (!formId) {
    return res.status(400).json({ error: "Missing formId" });
  }
  try {
    console.log(fields);
    const data = await gfFetch(`/forms/${formId}/submissions`, "POST", fields);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
