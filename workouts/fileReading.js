// Create and read a text file and log its contents.

const fs = require('fs');

fs.writeFile('example.txt', 'This is the content of the example file.', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }

  fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    console.log(data);
  });
});