export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  return res.status(200).json({
    output: '',
    mode: 'local-fallback',
    message: 'Local-first session build: frontend fallback generator should be used.'
  });
}
