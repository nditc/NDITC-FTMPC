// src/app/api/upload/route.ts

import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const customFilename = formData.get('filename') as string | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadOptions: cloudinary.UploadApiOptions = {
      resource_type: 'auto',
      overwrite: true,

      invalidate: true,
    };

    console.log('File Upload' + customFilename);

    if (customFilename) {
      uploadOptions.public_id = customFilename; // Use custom filename as public_id
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(uploadOptions, (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(error);
          }
          resolve(result);
        })
        .end(buffer);
    });

    // Check if uploadResult has the secure_url
    if (uploadResult && typeof uploadResult === 'object' && 'secure_url' in uploadResult) {
      const secureUrl = (uploadResult as { secure_url: string }).secure_url;
      return NextResponse.json({ url: secureUrl }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: 'Cloudinary upload failed: No secure_url returned.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { message: 'Error uploading file', error: (error as Error).message },
      { status: 500 }
    );
  }
}
