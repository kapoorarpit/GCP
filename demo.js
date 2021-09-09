	
  const GOOGLE_CLOUD_PROJECT_ID = 'disco-glass-325310'; // Replace with your project ID
  const GOOGLE_CLOUD_KEYFILE = 'disco-glass-325310-f559dccdcb9b.json'; // Replace with the path to the downloaded private key

const {Storage} = require('@google-cloud/storage');

const storage = new Storage({ projectId: GOOGLE_CLOUD_PROJECT_ID,
                            keyFilename: GOOGLE_CLOUD_KEYFILE,});

const bucketName = 'first-12345bucket45678sdfgh';

async function createBucket() {
  // Creates the new bucket
  await storage.createBucket(bucketName);
  console.log(`Bucket ${bucketName} created.`);
}

createBucket().catch(console.error);