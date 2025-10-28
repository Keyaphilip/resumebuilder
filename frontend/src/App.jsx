import React, { useEffect, useState } from 'react'
import ResumeForm from './components/ResumeForm'
import ResumePreview from './components/ResumePreview'
import Suggestions from './components/Suggestions'
import PDFExport from './components/PDFExport'
import ATSWarnings from './components/ATSWarnings'
import axios from 'axios'

const STORAGE_KEY = 'resume_builder_data_v1'

export default function App(){
  const [data, setData] = useState(() => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : { personal: { name:'', email:'', phone:'', summary:''}, education:[], experience:[], skills:[] }
    }catch(e){ return { personal: { name:'', email:'', phone:'', summary:''}, education:[], experience:[], skills:[] } }
  })

  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },[data])

  const applySuggestion = (text)=>{
    setData(prev=>({ ...prev, personal: {...prev.personal, summary: text }}))
  }

  const API_BASE = import.meta.env.VITE_API_URL ?? ''

  const checkKeywords = async (jobDesc)=>{
    const resumeText = `${data.personal.summary} ${data.experience.map(e=>e.description||'').join(' ')} ${data.skills.join(' ')}`
    try{
      const res = await axios.post(`${API_BASE}/api/match`,{ resumeText, jobDescription: jobDesc })
      return res.data
    }catch(e){ return { matched: [], score: 0 }}
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        <div>
          <ResumeForm data={data} setData={setData} />
          <Suggestions text={data.personal.summary} onApply={applySuggestion} />
          <div className="mt-4 flex gap-2">
            <PDFExport />
            <button className="px-3 py-1 bg-gray-200 rounded" onClick={()=>{localStorage.removeItem(STORAGE_KEY); setData({ personal: { name:'', email:'', phone:'', summary:''}, education:[], experience:[], skills:[] })}}>Reset</button>
          </div>
        </div>
        <div>
          <ResumePreview data={data} />
          <ATSWarnings resumeText={`${data.personal.summary} ${data.skills.join(' ')}`} />
        </div>
      </div>
    </div>
  )
}
