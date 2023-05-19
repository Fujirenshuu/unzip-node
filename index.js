const fs = require('fs');

const path = require('path');

const unzipper = require('unzipper');

const zipFilePath = 'Fujitime.zip';

const extractPath = '';

function extractZipFile(zipFilePath, extractPath) {

  // Check if the ZIP file exists

  if (!fs.existsSync(zipFilePath)) {

    console.error('ZIP file not found.');

    return;

  }

  // Check the file extension

  const fileExt = path.extname(zipFilePath);

  if (fileExt !== '.zip') {

    console.error('The provided file is not a ZIP file.');

    return;

  }

  // Extract the ZIP file

  fs.createReadStream(zipFilePath)

    .pipe(unzipper.Extract({ path: extractPath }))

    .on('entry', (entry) => {

      const entryPath = entry.path;

      // Ensure files are not extracted outside the root directory

      const fullPath = path.join(extractPath, entryPath);

      const isPathSafe = fullPath.startsWith(extractPath);

      if (isPathSafe) {

        console.log('Extracted file:', fullPath);

      } else {

        console.error('Error extracting ZIP file: Invalid path');

      }

    })

    .on('close', () => {

      console.log('\nZIP file extracted successfully.');

    })

    .on('error', (err) => {

      console.error('An error occurred while extracting the ZIP file:', err);

    });

}

extractZipFile(zipFilePath, extractPath);

