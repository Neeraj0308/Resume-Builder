/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate.jsx'
import SidebarTemplate from './templates/SidebarTemplate.js'
import PhotoHeaderTemplate from './templates/PhotoHeaderTemplate.js'
import CardTemplate from './templates/CardTemplate.js'

type ResumePreviewProps = {
  data: any
  template: string
  accentColor: string
  classes?: string
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  template,
  accentColor,
  classes = '',
}) => {
  const renderTemplate = (template: string) => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />
      case 'sidebar':
        return <SidebarTemplate data={data}  accentColor={accentColor}/>
      case 'photoheader':
        return <PhotoHeaderTemplate data={data}  accentColor={accentColor}/> 
      case 'cardtemplate':
        return <CardTemplate data={data}  accentColor={accentColor}/>    
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className='w-full bg-gray-100'>
      <div
        id='resume-preview'
        className={'border border-gray-200 print:shadow-none print:border-none ' + classes}
      >
        
        {renderTemplate(template)}
      </div>

      <style>{`
        @page {
          size: letter;
          margin: 0;
        }
        @media print {
          html,
          body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview,
          #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ResumePreview