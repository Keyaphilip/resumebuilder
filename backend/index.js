const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// Mock skill trends storage
let skillsDB = { updated: new Date().toISOString(), skills: ['JavaScript','React','Node.js'] }

app.get('/api/skills', (req, res) => {
  res.json(skillsDB)
})

// Endpoint to trigger weekly update (in production this would be a scheduled job)
app.post('/api/skills/update', (req, res) => {
  // In real implementation, scrape LinkedIn/Indeed or call an API and update skillsDB
  skillsDB = { updated: new Date().toISOString(), skills: [...new Set([...skillsDB.skills, 'TypeScript','Tailwind CSS'])] }
  res.json({ ok: true, skillsDB })
})

// AI suggestion proxy (placeholder) — expects {text}
app.post('/api/suggest', (req, res) => {
  const { text } = req.body
  // In production call OpenAI/Cohere here with API keys stored in env vars
  const suggestion = text ? `${text} — Improved professional sentence.` : 'Add more details.'
  res.json({ suggestion })
})

// Keyword matching endpoint: expects {resumeText, jobDescription}
app.post('/api/match', (req, res) => {
  const { resumeText='', jobDescription='' } = req.body
  const jobWords = jobDescription.toLowerCase().split(/\W+/).filter(Boolean)
  const resumeWords = new Set(resumeText.toLowerCase().split(/\W+/).filter(Boolean))
  const matched = jobWords.filter(w => resumeWords.has(w))
  res.json({ matched, score: matched.length / Math.max(jobWords.length,1) })
})

app.listen(4000, ()=> console.log('Backend running on http://localhost:4000'))
