// logger.js
const fs = require('fs').promises;
const path = require('path');

async function logErrorToFile(error, fileName, functionName) {
  try {
    // Format the error message as needed
    const errorMessage = `Timestamp: ${new Date().toISOString()}\nFile: ${fileName}\nFunction: ${functionName}\nError: ${error.message}\nStack Trace: ${error.stack}\n\n`;

    // Specify the path to the log file
    const logFilePath = path.join(__dirname, "error.log");

    // Append the error message to the log file
    await fs.appendFile(logFilePath, errorMessage);
  } catch (loggingError) {
    // If an error occurs during logging, log it to the console
    console.error('Error logging to file:', loggingError);
  }
}

module.exports = { logErrorToFile };
