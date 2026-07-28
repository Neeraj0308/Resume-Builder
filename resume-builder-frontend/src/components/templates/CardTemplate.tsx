import { getImageUrl } from "../../utils/image";

import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Layers,
  BriefcaseBusiness,
  Globe,
} from "lucide-react";

type CardTemplateProps = {
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

const CardTemplate: React.FC<CardTemplateProps> = ({ data, accentColor }) => {
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

  // const nameParts = (data.personal_info?.full_name || "Your Name")
  //   .trim()
  //   .split(" ");
  // const initials = [nameParts[0], nameParts[nameParts.length - 1]]
  //   .filter(Boolean)
  //   .map((w) => w?.[0]?.toUpperCase())
  //   .join("");

  const imageSrc = getImageUrl(data.personal_info?.image);

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 leading-relaxed p-10 rounded-lg shadow-md">
      {/* HEADER */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        {/* {imageSrc ? (
          <img
            src={imageSrc}
            alt={data.personal_info?.full_name || "profile"}
            className="size-28 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className="size-28 rounded-full shrink-0 bg-gray-100 flex items-center justify-center text-3xl font-semibold"
            style={{ color: accentColor }}
          >
            {initials}
          </div>
        )} */}

        {imageSrc && (
          <img
            src={imageSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}

        <div>
          <h1
            className="text-3xl font-extrabold tracking-wide"
            style={{ color: accentColor }}
          >
            {(data.personal_info?.full_name || "Your Name").toUpperCase()}
          </h1>
          {data.personal_info?.profession && (
            <p
              className="text-lg font-medium mb-2"
              style={{ color: accentColor, opacity: 0.75 }}
            >
              {data.personal_info.profession}
            </p>
          )}
          {data.professional_summary && (
            <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
              {data.professional_summary}
            </p>
          )}
        </div>
      </header>

      <hr
        className="mb-6"
        style={{ borderColor: accentColor, borderWidth: "1.5px" }}
      />

      {/* TWO COLUMN BODY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: accentColor }}
              >
                Work Experiences
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {exp.company}
                      {exp.company && " | "}
                      {formatDate(exp.start_date)}
                      {(exp.start_date || exp.end_date || exp.is_current) &&
                        "-"}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </h3>
                    {exp.position && (
                      <p className="text-sm text-gray-600 italic mb-1">
                        {exp.position}
                      </p>
                    )}
                    {exp.description && (
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
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
                className="text-xl font-semibold mb-3"
                style={{ color: accentColor }}
              >
                Educations
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {edu.institution}
                    </h3>
                    <p className="text-xs text-gray-600 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mt-0.5">
  <span className="font-medium text-gray-700">
    {edu.degree} {edu.field && `in ${edu.field}`}
  </span>

  {(edu.graduation_StartDate || edu.graduation_EndDate) && (
    <span className="text-gray-500">
      {edu.graduation_StartDate && formatDate(edu.graduation_StartDate)}
      {edu.graduation_StartDate && edu.graduation_EndDate && " – "}
      {edu.graduation_EndDate && formatDate(edu.graduation_EndDate)}
    </span>
  )}

  {edu.gpa && (
    <>
      <span className="text-gray-300">•</span>
      <span className="text-gray-500">GPA: {edu.gpa}</span>
    </>
  )}
</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          {/* Contact */}
          <section>
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: accentColor }}
            >
              Contact
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="size-4 shrink-0" />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="size-4 shrink-0" />
                  <span className="break-all">{data.personal_info.email}</span>
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
                  <span>{data.personal_info.linkedin}</span>
                </div>
              )}
              {data.personal_info?.website && (
                <div className="flex items-center gap-1">
                  <Globe className="size-4" />
                  <a
                    href={
                      data.personal_info.website.startsWith("http")
                        ? data.personal_info.website
                        : `https://${data.personal_info.website}`
                    }
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-xs hover:text-blue-600"
                  >
                    {data.personal_info.website}
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Skills as "Expertise" */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: accentColor }}
              >
                Expertise
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Projects (this template's reference image has no dedicated slot for these, so kept here) */}
          {data.project && data.project.length > 0 && (
            <section>
              <h2
                className="text-xl font-semibold mb-3 flex items-center gap-2"
                style={{ color: accentColor }}
              >
                <Layers className="size-5" /> Projects
              </h2>
              <div className="space-y-2 text-sm text-gray-700">
                {data.project.map((p, index) => (
                  <div key={index}>
                    <p className="font-semibold text-gray-900">
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
                    {p.description && <p>{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTemplate;
