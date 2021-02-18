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
const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      validate: nameInput => {
        if(nameInput) {
          return true
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
      validate: githubUsername => {
        if(githubUsername) {
          return true
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter some information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself:',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
  ===============
  Add a New Project
  ===============
  `);
    return inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of your project?',
          validate: projectName => {
            if(projectName) {
              return true
            } else {
              console.log('Please enter the project name!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'description',
          message: 'Provide a description of the project (Required)',
          validate: desc => {
            if(desc) {
              return true
            } else {
              console.log('Please enter project description!');
              return false;
            }
          }
        },
        {
          type: 'checkbox',
          name: 'languages',
          message: 'What did you build this project with? (Check all that apply)',
          choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
          type: 'input',
          name: 'link',
          message: 'Enter the GitHub link to your project. (Required)',
          validate: link => {
            if(link) {
              return true
            } else {
              console.log('Please enter link to project!');
              return false;
            }
          }
        },
        {
          type: 'confirm',
          name: 'feature',
          message: 'Would you like to feature this project?',
          default: false
        },
        {
          type: 'confirm',
          name: 'confirmAddProject',
          message: 'Would you like to add another project?',
          default: false
        }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if(projectData.confirmAddProject) {
        return promptProject(portfolioData)
      } else {
        return portfolioData;
      }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
});
