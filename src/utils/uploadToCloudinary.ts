export async function uploadToCloudinary(file: File) {
  const cloudName = "deafjdeev";
  const uploadPreset = "unsigned_preset";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  const res = await fetch(url, { method: "POST", body: formData });
  const data = await res.json();
  if (data.secure_url) return data.secure_url;
  throw new Error(data.error?.message || "Error al subir la imagen");
}
