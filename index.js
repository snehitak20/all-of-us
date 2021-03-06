// Dependencies 
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
// Connect to the database
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
  
// The initial questions to start 
function startPrompt() {
    const startQuestion = [{
      type: "list",
      name: "action",
      message: "What would you like to do?",
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
            case "Delete a role":
                deleteRole();
            break;
              case "Delete an employee":
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

// Here, allows the choice to view to different tables 
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

// To add a new department 
const addNewDepartment = () => { 
    let questions = [ 
        {
            type: "input", 
            name: "name", 
            message: "What is the new department name?"
        }
    ];

    inquirer.prompt(questions)
    .then (response => {
        const query = `INSERT INTO department (name) VALUES (?)`;
        connection.query(query, [response.name], (err, res) => {
            if (err) throw err;
            console.log(`Successfully inserted ${response.name} department at id ${res.insertId}`);
            
            startPrompt();
        });
    })
    .catch(err => {
        console.error(err);
    });
};

// To add a new role
const addNewRole = () => {
    // Gets the list of all departments with department_id to make the choices object list for prompt question
    const departments = [];
    connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
        if (err) throw err;
        res.forEach(dep => {
            let qObj = {
                name: dep.name,
                value: dep.id
            }
            departments.push(qObj);
        });
  
        // Question list to get arguments for making new roles
        let questions = [
            {
                type: "input",
                name: "title",
                message: "What is the title of the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the new role?"
            },
            {
                type: "list",
                name: "department",
                choices: departments,
                message: "Which department is this role in?"
            }
        ];
  
        inquirer.prompt(questions)
        .then(response => {
            const query = `INSERT INTO ROLE (title, salary, department_id) VALUES (?)`;
                connection.query(query, [[response.title, response.salary, response.department]], (err, res) => {
                    if (err) throw err;
                        console.log(`Successfully inserted ${response.title} role at id ${res.insertId}`);
                    startPrompt();
                });
        })
            
        .catch(err => {
            console.error(err);
        });

    });
};

// To add a new employee
const addNewEmployee = () => {
    // Gets all of the employee list to make choice of employee's manager
    connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
        if (err) throw err;
        const employeeChoice = [
            {
                name: 'None',
                value: 0
            }
        ]; 

        // An employee can have NO manager
        emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
            name: first_name + " " + last_name,
            value: id
        });
    });
      
    // Gets ALL of the roles to make choice of employee's role
    connection.query("SELECT * FROM ROLE", (err, rolRes) => {
        if (err) throw err;
        const roleChoice = [];
        rolRes.forEach(({ title, id }) => {
            roleChoice.push ({
                name: title,
                value: id
            });
        });
       
    let questions = [
          {
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?"
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?"
          },
          {
            type: "list",
            name: "role_id",
            choices: roleChoice,
            message: "What is the employee's role?"
          },
          {
            type: "list",
            name: "manager_id",
            choices: employeeChoice,
            message: "Who is the employee's manager? (Can be null)"
          }
    ]
    
    inquirer.prompt(questions)
        .then(response => {
            const query = `INSERT INTO EMPLOYEE (first_name, last_name, role_id, manager_id) VALUES (?)`;
            let manager_id = response.manager_id !== 0? response.manager_id: null;

            connection.query(query, [[response.first_name, response.last_name, response.role_id, manager_id]], (err, res) => {
                if (err) throw err;
                console.log(`Successfully inserted employee ${response.first_name} ${response.last_name} with id ${res.insertId}`);
              
                startPrompt();
            });
        })
          
        .catch(err => {
            console.error(err);
        });
    })
});
  
}

// To update a role
const updateRole = () => {
    // Gets all of the employees
    connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
        if (err) throw err;
        const employeeChoice = [];
        emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
        });
    });
      
    // Gets all of the role list to make choice of employee's role
    connection.query("SELECT * FROM ROLE", (err, rolRes) => {
        if (err) throw err;
        const roleChoice = [];
        rolRes.forEach(({ title, id }) => {
            roleChoice.push({
                name: title,
                value: id
            });
        });
       
        let questions = [
          {
            type: "list",
            name: "id",
            choices: employeeChoice,
            message: "Whose role do you want to update?"
          },
          {
            type: "list",
            name: "role_id",
            choices: roleChoice,
            message: "What is the employee's new role?"
          }
        ]
    
        inquirer.prompt(questions)
            .then(response => {
                const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
                connection.query(query, [
                    {role_id: response.role_id},
                    "id",
                    response.id
                ], (err, res) => {
                if (err) throw err;
              
                console.log("Successfully updated employee's role!");
              
                startPrompt();
            });
        })
        
        .catch(err => {
            console.error(err);
        });
    })
});
  
}

// To view employees by managers
const viewEmployeeByManager =  () => {
    // Gets all of the employees 
    connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
        if (err) throw err;
        const employeeChoice = [{
            name: 'None',
            value: 0
        }];
        emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
       
      let questions = [
        {
          type: "list",
          name: "manager_id",
          choices: employeeChoice,
          message: "Whose role do you want to update?"
        },
      ]
    
      inquirer.prompt(questions)
        .then(response => {
            let manager_id, query;
            if (response.manager_id) {
                query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, 
                R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
                FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
                LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
                LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id
                WHERE E.manager_id = ?;`;
            } else {
                manager_id = null;
                query = `SELECT E.id AS id, E.first_name AS first_name, E.last_name AS last_name, 
                R.title AS role, D.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
                FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
                LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id
                LEFT JOIN EMPLOYEE AS M ON E.manager_id = M.id
                WHERE E.manager_id is null;`;
            }
            connection.query(query, [response.manager_id], (err, res) => {
                if (err) throw err;
                console.table(res);
            
                startPrompt();
            });
        })

        .catch(err => {
          console.error(err);
        }); 
    });
}

// To update the employee manager
const updateManager = ()=> {
    // Gets all of the employees
    connection.query("SELECT * FROM EMPLOYEE", (err, emplRes) => {
        if (err) throw err;
        const employeeChoice = [];
        emplRes.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
      
        const managerChoice = [{
            name: 'None',
            value: 0
        }]; 
        
        // An employee can have NO manager
        emplRes.forEach(({ first_name, last_name, id }) => {
            managerChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
       
        let questions = [
            {
            type: "list",
            name: "id",
            choices: employeeChoice,
            message: "Who do you want to update?"
            },
            {
            type: "list",
            name: "manager_id",
            choices: managerChoice,
            message: "Who is the employee's new manager?"
            }
        ]
    
      inquirer.prompt(questions)
        .then(response => {
            const query = `UPDATE EMPLOYEE SET ? WHERE id = ?;`;
            let manager_id = response.manager_id !== 0? response.manager_id: null;
            connection.query(query, [
                {manager_id: manager_id},
                response.id
            ], (err, res) => {
            if (err) throw err;
              
            console.log("Successfully updated employee's manager");
            startPrompt();
        });
    })

        .catch(err => {
          console.error(err);
        });
    });
};

// To delete a department
const deleteDepartment = () => {
    const departments = [];
    connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
      if (err) throw err;
  
      res.forEach(dep => {
        let qObj = {
          name: dep.name,
          value: dep.id
        }
        departments.push(qObj);
    });
  
    let questions = [
        {
          type: "list",
          name: "id",
          choices: departments,
          message: "Which department do you want to delete?"
        }
    ];
  
    inquirer.prompt(questions)
    .then(response => {
        const query = `DELETE FROM DEPARTMENT WHERE id = ?`;
        connection.query(query, [response.id], (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} row(s) successfully deleted!`);
          
            startPrompt();
        });
    })
      
    .catch(err => {
        console.error(err);
    });
});
};


// To delete a role
const deleteRole = () => {
    const departments = [];
    connection.query("SELECT * FROM ROLE", (err, res) => {
        if (err) throw err;
  
        const roleChoice = [];
        res.forEach(({ title, id }) => {
            roleChoice.push({
            name: title,
            value: id
        });
    });
  
    let questions = [
        {
          type: "list",
          name: "id",
          choices: roleChoice,
          message: "Which role do you want to delete?"
        }
    ];
  
    inquirer.prompt(questions)
    .then(response => {
        const query = `DELETE FROM ROLE WHERE id = ?`;
        connection.query(query, [response.id], (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} row(s) successfully deleted!`);

          startPrompt();
        });
    })
    
    .catch(err => {
        console.error(err);
    });
});
};

// To delete an employee
const deleteEmployee = () => {
    connection.query("SELECT * FROM EMPLOYEE", (err, res) => {
        if (err) throw err;
  
        const employeeChoice = [];
        res.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });
  
        let questions = [
            {
            type: "list",
            name: "id",
            choices: employeeChoice,
            message: "Which employee do you want to delete?"
            }
        ];
  
      inquirer.prompt(questions)
      .then(response => {
          const query = `DELETE FROM EMPLOYEE WHERE id = ?`;
          connection.query(query, [response.id], (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} row(s) successfully deleted!`);
          
            startPrompt();
            });
        })
      
        .catch(err => {
            console.error(err);
         });
    });
};

// To view each department's budget
const viewBudget = () => {
    connection.query("SELECT * FROM DEPARTMENT", (err, res) => {
        if (err) throw err;
  
        const depChoice = [];
        res.forEach(({ name, id }) => {
            depChoice.push({
            name: name,
            value: id
            });
        });
  
        let questions = [
            {
            type: "list",
            name: "id",
            choices: depChoice,
            message: "Which department's budget do you want to see?"
            }
        ];
  
      inquirer.prompt(questions)
      .then(response => {
        const query = `SELECT D.name, SUM(salary) AS budget FROM EMPLOYEE AS E LEFT JOIN ROLE AS R ON E.role_id = R.id
        LEFT JOIN DEPARTMENT AS D ON R.department_id = D.id WHERE D.id = ? `;
        connection.query(query, [response.id], (err, res) => {
          if (err) throw err;
          console.table(res);
          startPrompt();
        });
      })

        .catch(err => {
            console.error(err);
        });
    });
};