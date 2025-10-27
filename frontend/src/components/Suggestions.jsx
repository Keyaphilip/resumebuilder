import React, {useState} from 'react'
import axios from 'axios'

export default function Suggestions({text, onApply}){
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState('')

  const askAI = async () =>{
    setLoading(true)
    try{
      const res = await axios.post('http://localhost:4000/api/suggest',{text})
      setSuggestion(res.data.suggestion)
    }catch(e){
      setSuggestion('Failed to fetch suggestion')
    }finally{setLoading(false)}
  }

  return (
    <div className="mt-3">
      <button onClick={askAI} className="px-3 py-1 bg-blue-600 text-white rounded">AI Suggest</button>
      {loading && <div className="text-sm text-gray-500">Thinking...</div>}
      {suggestion && (
        <div className="mt-2 p-2 bg-gray-50 border rounded">
          <div className="text-sm mb-2">{suggestion}</div>
          <button onClick={()=>onApply(suggestion)} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Apply</button>
        </div>
      )}
    </div>
  )
}
