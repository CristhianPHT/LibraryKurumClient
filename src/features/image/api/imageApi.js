import { baseRequest } from '@srd/api/baseClient'

export async function getImageUploadUrl() { // Para obtener la URL de subida de la imagen desde R2, por ahora testing
  return baseRequest("/image/test/upload-url", {
    method: "GET",
  });
}

export async function uploadImage(uploadUrl, file) {
  const response = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!response.ok) {
    throw new Error("No se pudo subir la imagen a R2");
  }
}
  
export async function createImageUpload(data) {
  return baseRequest("/image/upload", {
    method: "POST",
    data,
  });
}