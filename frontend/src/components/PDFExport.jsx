import React from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function PDFExport({rootId='resume-root'}){
  const exportPDF = async () =>{
    const el = document.getElementById(rootId)
    if(!el) return alert('Preview not found')
    const canvas = await html2canvas(el, {scale:2})
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p','pt','a4')
    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('resume.pdf')
  }

  return <button onClick={exportPDF} className="px-3 py-1 bg-indigo-600 text-white rounded">Download PDF</button>
}
