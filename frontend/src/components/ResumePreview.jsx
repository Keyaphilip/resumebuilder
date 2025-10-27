import React from 'react'

export default function ResumePreview({data}){
  const { personal, education, experience, skills } = data
  return (
    <div id="resume-root" className="bg-white p-6 rounded shadow h-full">
      <div className="border-b pb-3 mb-3">
        <h1 className="text-2xl font-bold">{personal.name || 'Your Name'}</h1>
        <div className="text-sm text-gray-600">{personal.email} {personal.phone}</div>
      </div>

      <p className="mb-3 text-gray-700">{personal.summary}</p>

      <h3 className="font-semibold">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((s,i)=>(<span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">{s}</span>))}
      </div>

      <h3 className="font-semibold">Education</h3>
      <ul className="list-disc ml-5 mb-3">
        {education.map((e,i)=>(<li key={i}>{e.school} — {e.degree} ({e.year})</li>))}
      </ul>

      <h3 className="font-semibold">Experience</h3>
      <ul className="list-disc ml-5">
        {experience.map((ex,i)=>(<li key={i}>{ex.role} @ {ex.company} ({ex.years})</li>))}
      </ul>
    </div>
  )
}
