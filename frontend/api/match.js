export default function handler(req,res){
  try{
    const { resumeText='', jobDescription='' } = req.method === 'POST' ? req.body : {}
    const jobWords = jobDescription.toLowerCase().split(/\W+/).filter(Boolean)
    const resumeWords = new Set(resumeText.toLowerCase().split(/\W+/).filter(Boolean))
    const matched = jobWords.filter(w => resumeWords.has(w))
    const score = matched.length / Math.max(jobWords.length,1)
    res.status(200).json({ matched, score })
  }catch(err){
    res.status(500).json({ error: 'server error' })
  }
}
