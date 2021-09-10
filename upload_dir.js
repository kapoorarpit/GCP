'use strict';
const GOOGLE_CLOUD_PROJECT_ID = 'disco-glass-325310'; 
const GOOGLE_CLOUD_KEYFILE = 'disco-glass-325310-f559dccdcb9b.json'; 

async function main(bucketName, directoryPath) {
  // The ID of your GCS bucket
  bucketName = 'first-12345bucket45678sdfgh';

  // The local directory to upload
  directoryPath = '././upload';

  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage({ projectId: GOOGLE_CLOUD_PROJECT_ID,
                                keyFilename: GOOGLE_CLOUD_KEYFILE,});

const fs = require('fs');
const path = require('path');
const fileList = [];

  async function uploadDirectory() {
    // Get a list of files from the specified directory
    let dirCtr = 1;
    let itemCtr = 0;
    const pathDirName = path.dirname(directoryPath);

    getFiles(directoryPath);

    function getFiles(directory) {
      fs.readdir(directory, (err, items) => {
        dirCtr--;
        itemCtr += items.length;
        items.forEach(item => {
          const fullPath = path.join(directory, item);
          fs.stat(fullPath, (err, stat) => {
            itemCtr--;
            if (stat.isFile()) {
              fileList.push(fullPath);
            } else if (stat.isDirectory()) {
              dirCtr++;
              getFiles(fullPath);
            }
            if (dirCtr === 0 && itemCtr === 0) {
              onComplete();
            }
          });
        });
      });
    }

    async function onComplete() {
      const resp = await Promise.all(
        fileList.map(filePath => {
          let destination = path.relative(pathDirName, filePath);
          // If running on Windows
          if (process.platform === 'win32') {
            destination = destination.replace(/\\/g, '/');
          }
          return storage
            .bucket(bucketName)
            .upload(filePath, {destination})
        })
      );

      const successfulUploads =
        fileList.length - resp.filter(r => r.status instanceof Error).length;
      console.log(
        `${successfulUploads} files uploaded to ${bucketName} successfully.`
      );
    }
  }

  uploadDirectory().catch(console.error);
  // [END upload_directory]
}

main().catch(console.error);