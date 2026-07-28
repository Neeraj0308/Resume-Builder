import React from "react"
import { Mail, Phone, MapPin,  Globe, BriefcaseBusiness } from "lucide-react"

type ClassicTemplateProps = {
  data: {
    personal_info?: {
      full_name?: string
      email?: string
      phone?: string
      location?: string
      profession?: string
      linkedin?: string
      website?: string
    }
    professional_summary?: string
    experience?: Array<{
      position?: string
      company?: string
      start_date?: string
      end_date?: string
      is_current?: boolean
      description?: string
    }>
    project?: Array<{
      name?: string
      description?: string
      link?:string
    }>
    education?: Array<{
      degree?: string
      field?: string
      institution?: string
      graduation_StartDate?: string
      graduation_EndDate?: string
      gpa?: string
    }>
    skills?: string[]
  }
  accentColor: string
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, accentColor }) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 leading-relaxed">
      {/* Header */}
      <header className="text-center mb-8 pb-6 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="size-4" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
           {data.personal_info?.profession && (
            <div className="flex items-center gap-1">
              <BriefcaseBusiness className="size-4" />
              <span className="break-all">{data.personal_info.profession}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <BriefcaseBusiness className="size-4" />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
          <div className="flex items-center gap-1">
          <Globe className="size-4" />
          <a
          href={
          data.personal_info.website.startsWith('http')
          ? data.personal_info.website
          : `https://${data.personal_info.website}`
          } style = {{textDecoration:'none'}}
          target="_blank"
          rel="noopener noreferrer"
          className="break-all text-xs hover:text-blue-600"
          >
          {data.personal_info.website}
          </a>
          </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>

          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project && data.project.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            PROJECTS
          </h2>

           <div className="space-y-6">
              {data.project.map((p, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{p.name}</h3>
                    </div>
                     {p.link && (
                  <a
                    href={p.link.startsWith('http') ? p.link : `https://${p.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-all"
                  >
                    {p.name}
                  </a>
                )}
                  </div>
                  
                  {p.description && (
                    <div className="text-gray-700 leading-relaxed text-sm mt-3">
                      {p.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            EDUCATION
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-sm text-gray-600">
                  <p>{formatDate(edu.graduation_StartDate)} -  {formatDate(edu.graduation_EndDate)}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4" style={{ color: accentColor }}>
            CORE SKILLS
          </h2>

          <div className="flex gap-4 flex-wrap">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                • {skill}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ClassicTemplate