import React from 'react'

export default function ResumeForm({data, setData}){
  const updatePersonal = (e) => {
    setData(prev => ({...prev, personal: {...prev.personal, [e.target.name]: e.target.value}}))
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Personal</h2>
      <input name="name" placeholder="Full name" value={data.personal.name} onChange={updatePersonal} className="w-full mb-2 p-2 border rounded" />
      <input name="email" placeholder="Email" value={data.personal.email} onChange={updatePersonal} className="w-full mb-2 p-2 border rounded" />
      <input name="phone" placeholder="Phone" value={data.personal.phone} onChange={updatePersonal} className="w-full mb-2 p-2 border rounded" />
      <textarea name="summary" placeholder="Professional summary" value={data.personal.summary} onChange={updatePersonal} className="w-full mb-2 p-2 border rounded" />

      <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>
      <input placeholder="Add comma-separated skills" onBlur={(e)=>{
        const skills = e.target.value.split(',').map(s=>s.trim()).filter(Boolean)
        setData(prev=>({...prev, skills: [...prev.skills, ...skills]}))
        e.target.value = ''
      }} className="w-full mb-2 p-2 border rounded" />

      <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>
      <textarea placeholder='[{"school":"X","degree":"Y","year":"2022"}]' className="w-full p-2 border rounded mt-2" onBlur={(e)=>{
        try{
          const arr = JSON.parse(e.target.value)
          setData(prev=>({...prev, education: arr}))
          e.target.value = ''
        }catch(err){
          alert('Invalid JSON')
        }
      }} />

      <h2 className="text-xl font-semibold mt-4 mb-2">Experience</h2>
      <textarea placeholder='[{"role":"Dev","company":"X","years":"2020-2022","description":"Did things"}]' className="w-full p-2 border rounded mt-2" onBlur={(e)=>{
        try{
          const arr = JSON.parse(e.target.value)
          setData(prev=>({...prev, experience: arr}))
          e.target.value = ''
        }catch(err){
          alert('Invalid JSON')
        }
      }} />
    </div>
  )
}
