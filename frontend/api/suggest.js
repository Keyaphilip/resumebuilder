export default function handler(req, res){
  // simple mock suggestion handler for Vercel serverless
  try{
    const { text='' } = req.method === 'POST' ? req.body : {}
    const suggestion = text ? `${text.replace(/\s+/g,' ').trim()} — Improved professional version.` : 'Please provide text to improve.'
    res.status(200).json({ suggestion })
  }catch(err){
    res.status(500).json({ error: 'server error' })
  }
}
