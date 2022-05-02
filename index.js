//require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');

// Create the connection to mySQL
const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // Add MySQL password here
      password: 'password',
      database: 'hogwarts_db'
    },
    console.log(`Connected to the hogwarts_db database.`)
);
// Connect to the database--> FIZ THIS LATE
connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    figlet('HOGWARTS', function(err, data) {
      if (err) {
        console.log('ascii art not loaded');
      } else {
        console.log(data);
      }  
      startPrompt();
    });
  });
  

function startPrompt() {
    const startQuestion = [{
      type: "list",
      name: "action",
      message: "what would you like to do?",
      loop: false,
      choices: ["View all employees", "View all roles", "View all departments", "Add an employee", "Add a role", "Add a department", "Update role for an employee", "Update employee's manager", "View employees by manager", "Delete a department", "Delete a role", "Delete an employee", "View the total utilized budget of a department", "Quit"]
    }]

    inquirer.prompt(startQuestion)
    .then(response => {
        switch (response.action) {
            case "View all employees":
                viewAll("EMPLOYEE");
            break;
            case "View all roles":
                viewAll("ROLE");
            break;
            case "View all departments":
                viewAll("DEPARTMENT");
            break;
            case "Add a department":
                addNewDepartment();
            break;
            case "Add a role":
                addNewRole();
            break;
            case "Add an employee":
                addNewEmployee();
            break;
            case "Update role for an employee":
                updateRole();
            break;
            case "View employees by manager":
                viewEmployeeByManager();
            break;
            case "Update employee's manager":
                updateManager();
            break;
            case "Delete a department":
                deleteDepartment();
            break;
            case "delete a role":
                deleteRole();
            break;
              case "delete an employee":
                deleteEmployee();
                break;
            case "View the total utilized budget of a department":
                viewBudget();
            break;
            default:
            connection.end();
            }
        })
        .catch(err => {
            console.error(err);
    });
}

const viewAll = (table) => {
    let query;
    if (table === "DEPARTMENT") {
      query = `SELECT * FROM DEPARTMENT`;
    } else if (table === "ROLE") {
      query = `SELECT R.id AS id, title, salary, D.name AS department FROM ROLE AS R LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id;`;
    } else {
      query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, 
      R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
      FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
      LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
      LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id;`;
  
    }
    connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
  
      startPrompt();
    });
  };