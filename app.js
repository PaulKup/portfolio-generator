const inquirer = require('inquirer');
// sets the filesystem module from node.js standard library to the const fs so that the module can be used
// const fs = require('fs');
// // same as fs but for our own file to generate the page template and insert name and github link
// const generatePage = require('./src/page-template.js');

// // writeFile takes 3 arguments name of file being written to, what to write, function in case of error
// fs.writeFile('index.html', generatePage(name, github), err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// }); 
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => {
    console.log(answers);
  })
  .catch(error => {
    if(error.isTtyError) {
    // prompt couldn't be rendered in the current environment
  } else {

  }
});
