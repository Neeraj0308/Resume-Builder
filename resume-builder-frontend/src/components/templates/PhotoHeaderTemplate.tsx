import { getImageUrl } from "../../utils/image";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Layers,
  BriefcaseBusiness,
} from "lucide-react";

type PhotoHeaderTemplateProps = {
  data: {
    personal_info?: {
      full_name?: string;
      email?: string;
      phone?: string;
      location?: string;
      profession?: string;
      linkedin?: string;
      website?: string;
      image?: File | string;
    };
    professional_summary?: string;
    experience?: Array<{
      position?: string;
      company?: string;
      start_date?: string;
      end_date?: string;
      is_current?: boolean;
      description?: string;
    }>;
    project?: Array<{
      name?: string;
      description?: string;
      link?: string;
    }>;
    education?: Array<{
      degree?: string;
      field?: string;
      institution?: string;
      graduation_StartDate?: string;
      graduation_EndDate?: string;
      gpa?: string;
    }>;
    skills?: string[];
  };
  accentColor: string;
};

const PhotoHeaderTemplate: React.FC<PhotoHeaderTemplateProps> = ({
  data,
  accentColor,
}) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "short",
      },
    );
  };

  const nameParts = (data.personal_info?.full_name || "Your Name")
    .trim()
    .split(" ");
  const firstName = nameParts[0] || "Your";
  const lastName = nameParts.slice(1).join(" ") || "Name";

  const initials = [nameParts[0], nameParts[nameParts.length - 1]]
    .filter(Boolean)
    .map((w) => w?.[0]?.toUpperCase())
    .join("");

  // const imageSrc = data.personal_info?.image
  //   ? typeof data.personal_info.image === "string"
  //     ? `http://localhost:5000/uploads/${data.personal_info.image}`
  //     : URL.createObjectURL(data.personal_info.image)
  //   : null;

  const imageSrc = getImageUrl(data.personal_info?.image);

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed">
      {/* HEADER */}
      <header className="grid grid-cols-1 sm:grid-cols-[260px_1fr]">
        <div className="bg-[#eef6f7] flex justify-center sm:justify-start items-start pt-8 sm:pl-8">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={data.personal_info?.full_name || "profile"}
              className="size-36 rounded-full object-cover border-4 border-white shadow"
            />
          ) : (
            <div
              className="size-36 rounded-full border-4 border-white shadow bg-white flex items-center justify-center text-4xl font-semibold"
              style={{ color: accentColor }}
            >
              {initials}
            </div>
          )}
        </div>

        <div className="bg-[#eef6f7] pt-8 pb-6 pl-6 pr-8">
          <p className="text-3xl text-gray-900">{firstName}</p>
          <h1 className="text-4xl font-bold text-gray-900 -mt-1">{lastName}</h1>
        </div>

        {/* Spacer under photo to align with banner */}
        <div className="bg-[#eef6f7]" />

        {/* Job title banner */}
        <div className="px-8 py-4" style={{ backgroundColor: accentColor }}>
          {data.personal_info?.profession && (
            <p className="text-white text-lg tracking-wide font-medium uppercase">
              {data.personal_info.profession}
            </p>
          )}
        </div>
      </header>

      {/* BODY */}
      <div className="grid grid-cols-1 sm:grid-cols-[260px_1fr]">
        {/* LEFT COLUMN */}
        <aside className="bg-[#eef6f7] p-6 space-y-6">
          {/* Contact */}
          <div>
            <h2
              className="text-sm font-bold tracking-wide border-b-2 pb-1 mb-3"
              style={{ borderColor: accentColor }}
            >
              CONTACT
            </h2>
            <div className="space-y-2 text-sm text-gray-700">
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0" />
                  <span className="break-all">{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
              {data.personal_info?.linkedin && (
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="size-4 shrink-0" />
                  <span className="break-all">
                    {data.personal_info.linkedin}
                  </span>
                </div>
              )}
              {data.personal_info?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="size-4 shrink-0" />
                  <a
                    href={
                      data.personal_info.website.startsWith("http")
                        ? data.personal_info.website
                        : `https://${data.personal_info.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all hover:underline"
                  >
                    {data.personal_info.website}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Profile Summary */}
          {data.professional_summary && (
            <div>
              <h2
                className="text-sm font-bold tracking-wide border-b-2 pb-1 mb-3"
                style={{ borderColor: accentColor }}
              >
                PROFILE SUMMARY
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.professional_summary}
              </p>
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2
                className="text-sm font-bold tracking-wide border-b-2 pb-1 mb-3"
                style={{ borderColor: accentColor }}
              >
                SKILLS
              </h2>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {data.skills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span style={{ color: accentColor }}>✓</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className="p-6 space-y-6">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold tracking-wide border-b-2 pb-1 mb-4"
                style={{ borderColor: accentColor }}
              >
                PROFESSIONAL EXPERIENCE
              </h2>
              <div className="space-y-5">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-gray-600">{exp.position}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {data.personal_info?.location}
                      {data.personal_info?.location && " | "}
                      {formatDate(exp.start_date)} -{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-outside ml-4 mt-2 space-y-1 text-sm text-gray-700">
                        {exp.description
                          .split("\n")
                          .filter((line) => line.trim())
                          .map((line, i) => (
                            <li key={i}>{line.replace(/^[-•]\s*/, "")}</li>
                          ))}
                      </ul>
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
                className="text-sm font-bold tracking-wide border-b-2 pb-1 mb-4"
                style={{ borderColor: accentColor }}
              >
                EDUCATION
              </h2>
              <div className="space-y-3">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 text-sm uppercase">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                     {formatDate(edu.graduation_StartDate)} - {formatDate(edu.graduation_EndDate)}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project && data.project.length > 0 && (
            <section>
              <h2
                className="text-sm font-bold tracking-wide border-b-2 pb-1 mb-4 flex items-center gap-2"
                style={{ borderColor: accentColor }}
              >
                <Layers className="size-4" /> PROJECTS
              </h2>
              <div className="space-y-3">
                {data.project.map((p, index) => (
                  <div key={index}>
                    <p className="font-bold text-gray-900 text-sm">
                      {p.link ? (
                        <a
                          href={
                            p.link.startsWith("http")
                              ? p.link
                              : `https://${p.link}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          style={{ color: accentColor }}
                        >
                          {p.name}
                        </a>
                      ) : (
                        p.name
                      )}
                    </p>
                    {p.description && (
                      <p className="text-sm text-gray-700 mt-1">
                        {p.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default PhotoHeaderTemplate;
