// src/util/uploadFileToCloudinary.ts

/**
 * Uploads a given File object to Cloudinary via the /api/upload route
 * and returns the secure URL of the uploaded image.
 *
 * @param file The File object to upload.
 * @returns A Promise that resolves with the Cloudinary secure URL string, or rejects with an error.
 */
export async function uploadFileToCloudinary(file: File, customFilename?: string): Promise<string> {
  if (!file) {
    throw new Error('No file provided for upload.');
  }

  const formData = new FormData();
  if (customFilename) {
    formData.append('filename', customFilename);
  }
  formData.append('file', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to upload file to Cloudinary.');
    }

    const data = await response.json();
    if (data.url) {
      return data.url;
    } else {
      throw new Error('Cloudinary URL not returned in the response.');
    }
  } catch (error) {
    console.error('Error in uploadFileToCloudinary:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
}
