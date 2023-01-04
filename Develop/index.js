// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const util = require("util");

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your repository? (Required)",
    //validate to make sure there is a value there
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("Please enter your repository title.");
        return false;
      }
    },
  },
  {
    type: "input",
    name: "description",
    message: "What is the description of your repository? (Required)",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("Please enter a description of the repository.");
        return false;
      }
    },
  },
  //Confirm Installation (Optional)
  {
    type: "confirm",
    name: "confirmInstallation",
    message: "Do you need to add an installation? (Optional)",
  },
  {
    //if confirmed
    type: "input",
    name: "installation",
    message: "Please enter your installation: ",
    //
    when: ({ confirmInstallation }) => {
      if (confirmInstallation) {
        return true;
      } else {
        return false;
      }
    },
  },
  //Confirm Usage (Optional)
  {
    type: "confirm",
    name: "confirmUsage",
    message: "Do you need to add a usage? (Optional)",
  },
  {
    //if confirmed
    type: "input",
    name: "instructions",
    message: "Please enter your usage for using your application: ",
    when: ({ confirmUsage }) => {
      if (confirmUsage) {
        return true;
      } else {
        return false;
      }
    },
  },
  //Confirm Contribution (Optional)
  {
    type: "confirm",
    name: "confirmContribution",
    message: "Do you need to add a contribution? (Optional)",
  },
  {
    //if confirmed
    type: "input",
    name: "contribution",
    message: "Please enter how other developers help your project: ",
    when: ({ confirmContribution }) => {
      if (confirmContribution) {
        return true;
      } else {
        return false;
      }
    },
  },
  //Confirm Tests (Optional)
  {
    type: "confirm",
    name: "testConfirm",
    message: "Do you need to add a Tests? (Optional)",
  },
  {
    //if confirmed
    type: "input",
    name: "testing",
    message: "Please explain how users test your application: ",
    when: ({ testConfirm }) => {
      if (testConfirm) {
        return true;
      } else {
        return false;
      }
    },
  },
  //select license
  {
    type: "list",
    name: "license",
    message: "Please choose a license.",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("Please select a license.");
        return false;
      }
    },
  },
  //get username
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username? (Required)",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("Please enter your GitHub username.");
        return false;
      }
    },
  },
  //get email
  {
    type: "input",
    name: "email",
    message: "What is your email address? (Required)",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        console.log("Please enter your email.");
        return false;
      }
    },
  },
  //get questions
  {
    type: "input",
    name: "questions",
    message: "Please list instructions for those who wish to contact you.",
    validate: (userInput) => {
      if (userInput) {
        return true;
      } else {
        return false;
      }
    },
  },
]; //end questions

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (error) => {
    if (error) {
      return console.log("Sorry there was an error : " + error);
    }
  });
}
const createReadMe = util.promisify(writeToFile);

// TODO: Create a function to initialize app
async function init() {
  try {
    const userAnswers = await inquirer.prompt(questions);
    console.log("Your README file has been made!", userAnswers);
    // get markdown template from generateMarkdown.js passing the answers as parameter
    const myMarkdown = generateMarkdown(userAnswers);
    console.log(myMarkdown);
    //write the readme file after the markdown is made
    await createReadMe("README1.md", myMarkdown);
  } catch (error) {
    console.log("There was an error " + error);
  }
}

// Function call to initialize app
init();
