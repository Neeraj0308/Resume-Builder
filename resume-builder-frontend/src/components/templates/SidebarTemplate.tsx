import React from "react"
import { Mail, Phone, MapPin, Globe, BriefcaseBusiness, GraduationCap, Layers } from "lucide-react"

type SidebarTemplateProps = {
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
      link?: string
    }>
    education?: Array<{
      degree?: string
      field?: string
      institution?: string
      graduation_date?: string
      gpa?: string
    }>
    skills?: string[]
  }
  accentColor: string
}

const SidebarTemplate: React.FC<SidebarTemplateProps> = ({ data, accentColor }) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ""
    const [year, month] = dateStr.split("-")
    return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  const initials = (data.personal_info?.full_name || "Your Name")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed grid grid-cols-1 sm:grid-cols-[260px_1fr]">
      {/* SIDEBAR */}
      <aside className="bg-[#1c2b3a] text-white p-6">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div
            className="size-28 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center text-3xl font-semibold"
            style={{ color: accentColor }}
          >
            {initials}
          </div>
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2
            className="text-center text-sm font-semibold tracking-wide py-2 mb-4 rounded"
            style={{ backgroundColor: accentColor }}
          >
            CONTACT
          </h2>
          <div className="space-y-3 text-sm">
            {data.personal_info?.phone && (
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Phone className="size-4" style={{ color: accentColor }} />
                  <span>Phone</span>
                </div>
                <p className="pl-6 text-gray-300 break-all">{data.personal_info.phone}</p>
              </div>
            )}
            {data.personal_info?.email && (
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Mail className="size-4" style={{ color: accentColor }} />
                  <span>Email</span>
                </div>
                <p className="pl-6 text-gray-300 break-all">{data.personal_info.email}</p>
              </div>
            )}
            {data.personal_info?.location && (
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin className="size-4" style={{ color: accentColor }} />
                  <span>Address</span>
                </div>
                <p className="pl-6 text-gray-300 break-all">{data.personal_info.location}</p>
              </div>
            )}
            {data.personal_info?.website && (
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <Globe className="size-4" style={{ color: accentColor }} />
                  <span>Website</span>
                </div>
                <a
                  href={
                    data.personal_info.website.startsWith("http")
                      ? data.personal_info.website
                      : `https://${data.personal_info.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-6 block text-gray-300 hover:text-white break-all text-xs"
                >
                  {data.personal_info.website}
                </a>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <BriefcaseBusiness className="size-4" style={{ color: accentColor }} />
                  <span>LinkedIn</span>
                </div>
                <p className="pl-6 text-gray-300 break-all text-xs">{data.personal_info.linkedin}</p>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2
              className="text-center text-sm font-semibold tracking-wide py-2 mb-4 rounded"
              style={{ backgroundColor: accentColor }}
            >
              SKILLS
            </h2>
            <ul className="space-y-2 text-sm">
              {data.skills.map((skill, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  <span className="text-gray-200">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projects (kept in sidebar since template has no dedicated space elsewhere in this layout) */}
        {data.project && data.project.length > 0 && (
          <div>
            <h2
              className="text-center text-sm font-semibold tracking-wide py-2 mb-4 rounded flex items-center justify-center gap-1"
              style={{ backgroundColor: accentColor }}
            >
              <Layers className="size-4" /> PROJECTS
            </h2>
            <div className="space-y-3 text-sm">
              {data.project.map((p, index) => (
                <div key={index}>
                  <p className="font-semibold">
                    {p.link ? (
                      <a
                        href={p.link.startsWith("http") ? p.link : `https://${p.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline break-all"
                        style={{ color: accentColor }}
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                  </p>
                  {p.description && <p className="text-gray-300 text-xs mt-1">{p.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTENT */}
      <main>
        {/* Header block */}
        <header className="bg-gray-100 px-8 py-10 text-center">
          <h1 className="text-4xl font-bold tracking-wide text-gray-800">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <p className="mt-1 text-sm font-semibold tracking-widest uppercase" style={{ color: accentColor }}>
              {data.personal_info.profession}
            </p>
          )}
          {data.professional_summary && (
            <p className="mt-4 text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {data.professional_summary}
            </p>
          )}
        </header>

        <div className="px-8 py-8 space-y-8">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-white text-sm font-semibold tracking-wide py-2 px-4 mb-6 rounded"
                style={{ backgroundColor: accentColor }}
              >
                WORK EXPERIENCE
              </h2>
              <div className="relative border-l-2 pl-6 space-y-8" style={{ borderColor: accentColor }}>
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    <span
                      className="absolute -left-7.75 top-1 size-3 rounded-full border-2 bg-white"
                      style={{ borderColor: accentColor }}
                    />
                    <h3 className="font-bold uppercase text-gray-900 text-sm">{exp.position}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {exp.company}
                      {exp.company && " | "}
                      {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-gray-700 mt-2 whitespace-pre-line leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section>
              <h2
                className="text-white text-sm font-semibold tracking-wide py-2 px-4 mb-6 rounded flex items-center gap-2"
                style={{ backgroundColor: accentColor }}
              >
                <GraduationCap className="size-4" /> EDUCATION
              </h2>
              <div className="relative border-l-2 pl-6 space-y-8" style={{ borderColor: accentColor }}>
                {data.education.map((edu, index) => (
                  <div key={index} className="relative">
                    <span
                      className="absolute -left-7.75 top-1 size-3 rounded-full border-2 bg-white"
                      style={{ borderColor: accentColor }}
                    />
                    <h3 className="font-bold uppercase text-gray-900 text-sm">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {edu.institution}
                      {edu.institution && " | "}
                      {formatDate(edu.graduation_date)}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default SidebarTemplate
