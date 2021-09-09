
const bucketName = 'first-12345bucket'
const filePath = './upload.txt'
const destFileName = 'done'
  
const GOOGLE_CLOUD_PROJECT_ID = 'disco-glass-325310'; // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = 'disco-glass-325310-f559dccdcb9b.json'; // Replace with the path to the downloaded private key
// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Creates a client

const storage = new Storage({ projectId: GOOGLE_CLOUD_PROJECT_ID,
    keyFilename: GOOGLE_CLOUD_KEYFILE,});


async function uploadFile() {
    await storage.bucket(bucketName).upload(filePath, {
    destination: destFileName,
    });

    console.log(`${filePath} uploaded to ${bucketName}`);
}

uploadFile().catch(console.error);
// [END storage_upload_file]
