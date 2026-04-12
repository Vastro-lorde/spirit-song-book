import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  publicId: string;
  url: string;
  secureUrl: string;
}

/**
 * Upload an image to Cloudinary.
 * @param file - Base64 data URI or a remote URL
 * @param folder - Optional folder path in Cloudinary
 */
export async function uploadImage(
  file: string,
  folder?: string
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "image",
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
  };
}

/**
 * Update (replace) an existing image on Cloudinary.
 * @param publicId - The public ID of the image to replace
 * @param file - Base64 data URI or a remote URL
 */
export async function updateImage(
  publicId: string,
  file: string
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });

  return {
    publicId: result.public_id,
    url: result.url,
    secureUrl: result.secure_url,
  };
}

/**
 * Delete an image from Cloudinary.
 * @param publicId - The public ID of the image to delete
 */
export async function deleteImage(
  publicId: string
): Promise<{ result: string }> {
  const response = await cloudinary.uploader.destroy(publicId);
  return { result: response.result };
}
