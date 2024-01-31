const fs = require('fs');
const csv = require('csv-parser');

const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
      const results = [];
      const readStream = fs.createReadStream(filePath);
  
      readStream
        .on('error', (error) => reject(error))
        .pipe(csv({
          separator: '\t', // Specify tab as the delimiter
        }))
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
}
module.exports = parseCSV;