const path = require('path');
const fs = require('fs');

exports.parseFileName = () => {
  //parse js file name for dynamic import in ejs template
  const fileData = fs.readFileSync(
    path.join(__dirname, '../public', 'assets.json')
  );
  const pasreData = JSON.parse(fileData);
  const fileName = pasreData['main.js'];

  return fileName;
};
