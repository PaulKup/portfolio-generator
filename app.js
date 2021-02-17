// sets the filesystem module from node.js standard library to the const fs so that the module can be used
const fs = require('fs');
// same as fs but for our own file to generate the page template and insert name and github link
const generatePage = require('./src/page-template.js');
// get the command line arguments starting from index 2 until the end (use .length because backend is exclusive)
const profileDataArgs = process.argv.slice(2, process.argv.length);
// notation to set variable names for corresponding indices in array
const [name, github] = profileDataArgs;
// writeFile takes 3 arguments name of file being written to, what to write, function in case of error
fs.writeFile('index.html', generatePage(name, github), err => {
  if (err) throw new Error(err);

  console.log('Portfolio complete! Check out index.html to see the output!');
}); 

