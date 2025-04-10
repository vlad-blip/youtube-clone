import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  projectId: process.env.GOOGLE_PROJECT_ID,
});

const bucketName = process.env.GOOGLE_BUCKET_NAME!;

async function createFolder(folderName: string) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(`${folderName}/`); // Note the trailing slash

    await file.save("", {
      metadata: { contentType: "application/x-directory" },
    });

    console.log(`Folder "${folderName}" created in bucket".`);
  } catch (error) {
    console.error("Error creating folder:", error);
  }
}

function getPublicUrl(path: string) {
  return `https://storage.googleapis.com/youtube-clone-videos/${path}`;
}

async function generateSignedUrl(fileName: string, expirationInMinutes = 60) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    const expiryDate = new Date();

    expiryDate.setMinutes(expiryDate.getMinutes() + expirationInMinutes);

    const [url] = await file.getSignedUrl({
      action: "read",
      expires: expiryDate,
    });

    return url;
  } catch (error) {
    console.error(error);
  }
}

interface IUploadFile {
  fileName: string;
  path: string;
  bytes: Buffer;
  contentType: string;
}

async function uploadFile({ bytes, path, contentType }: IUploadFile) {
  try {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(path);

    return await file.save(bytes, {
      metadata: {
        contentType,
      },
    });
  } catch (error) {
    console.error("error uploading file: ", error);
    return null;
  }
}

export { storage, createFolder, generateSignedUrl, uploadFile, getPublicUrl };
