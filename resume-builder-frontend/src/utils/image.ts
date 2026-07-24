const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getImageUrl = (image?: string | File | null): string => {
  if (!image) return "";

  // If user just selected a new file
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }

  // Already a complete URL
  if (image.startsWith("http")) {
    return image;
  }

  // Stored as uploads/abc.png
  if (image.startsWith("uploads/")) {
    return `${API_URL}/${image}`;
  }

  // Stored only as abc.png
  return `${API_URL}/uploads/${image}`;
};
