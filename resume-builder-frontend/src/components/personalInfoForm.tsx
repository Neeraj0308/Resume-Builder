import { getImageUrl } from "../utils/image";

import {
  Briefcase,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import React from "react";

type PersonalInfoData = {
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  profession?: string;
  linkedin?: string;
  website?: string;
  image?: File | string;
};

type PersonalInfoFormProps = {
  data: PersonalInfoData;
  onChange: (value: PersonalInfoData) => void;
};

const personalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const handleChange = (
    field: keyof PersonalInfoData,
    value: string | File,
  ) => {
    onChange({ ...data, [field]: value });
    
  };

  const removeImage = () => {
    onChange({ ...data, image: undefined });
  };

  const fields: Array<{
    key: Exclude<keyof PersonalInfoData, "image">;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    type: string;
    required?: boolean;
  }> = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    { key: "profession", label: "Profession", icon: Briefcase, type: "text" },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: BriefcaseBusiness,
      type: "url",
    },
    { key: "website", label: "Personal Website", icon: User, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal Information
      </h3>
      <p className="text-sm text-gray-600">
        Get Started with the personal information
      </p>
      <div className="flex items-center gap-2">
        <label>
          {data.image ? (
            <img
              src={getImageUrl(data.image)}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300"
            />
          ) : (
            <div>
              <User className="size-10 p-2.5 border rounded-full" />
              upload user image
            </div>
          )}

          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={async (e) => {
              if (!e.target.files?.[0]) return;


                const file = e.target.files[0];

                const MAX_IMAGE_SIZE = 2 *1024 ; // 1 MB

                if (file.size > MAX_IMAGE_SIZE) {
                alert("Image size should not exceed 1 MB.");
                e.target.value = "";
                return;
                }


              const formData = new FormData();
              formData.append("image", file);

              const token = localStorage.getItem("token");

              const response = await fetch(
                "http://localhost:5000/api/upload/profile",
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  body: formData,
                },
              );

              const result = await response.json();

              handleChange("image", result.image);
            }}
          />
        </label>
        {data.image && (
          <button
            type="button"
            onClick={removeImage}
            className="px-3 py-2 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="size-4" />
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={(data[field.key] as string) || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
               maxLength={field.key === "phone" ? 10 : undefined}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default personalInfoForm;
