const { writeFile, readFile, mkdir } = require('fs/promises');
const { join, basename } = require('path');

async function writeToFile(fileName, data) {
  try {
    await writeFile(fileName, data);
    console.log(`Wrote data to ${fileName}`);
  } catch (error) {
    console.error(`Got an error trying to write the file: ${error.message}`);
  }
}

async function uploadFile(sourcePath, destinationFolderPath) {
  try {
    // Ensure the destination folder exists
    await mkdir(destinationFolderPath, { recursive: true });
    console.log(`Ensured the folder ${destinationFolderPath} exists or created it`);

    // Read the file from the source path
    const data = await readFile(sourcePath);
    console.log(`Read data from ${sourcePath}`);

    // Get the base name of the source file
    const fileName = basename(sourcePath);

    // Define the full destination path
    const destinationPath = join(destinationFolderPath, fileName);

    // Write data to the destination path with the original filename
    await writeToFile(destinationPath, data);
    console.log(`Uploaded file to ${destinationPath}`);
  } catch (error) {
    console.error(`Got an error trying to upload the file: ${error.message}`);
  }
}

async function uploadMultipleFiles(sourceFilePaths, destinationFolderPath) {
  for (const sourcePath of sourceFilePaths) {
    await uploadFile(sourcePath, destinationFolderPath);
  }
}

// Define source file paths
const sourceFilePaths = [
  'C:\\Users\\knamk\\OneDrive\\Desktop\\Library\\PHYSICS F1.pdf',
  'C:\\Users\\knamk\\OneDrive\\Desktop\\Library\\Additional Mathematics Form I.pdf'
  // Add more file paths as needed
];

// Define destination folder path
const destinationFolderPath = 'uploads';

uploadMultipleFiles(sourceFilePaths, destinationFolderPath);
