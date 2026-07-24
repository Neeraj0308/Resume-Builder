const API_URL = "http://localhost:5000/api/pdf/import";

export const uploadResumePDF = async (file: File, token: string) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};
