import React from 'react'

export default function ATSWarnings({resumeText}){
  // very basic heuristics
  const warnings = []
  if(resumeText.length < 200) warnings.push('Resume is very short; consider adding more details.')
  if(resumeText.includes('Objective')) warnings.push('Use professional summary instead of Objective.')

  return (
    <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400">
      <h4 className="font-semibold">ATS Warnings</h4>
      <ul className="list-disc ml-5">
        {warnings.length ? warnings.map((w,i)=>(<li key={i}>{w}</li>)) : <li>No issues detected</li>}
      </ul>
    </div>
  )
}
