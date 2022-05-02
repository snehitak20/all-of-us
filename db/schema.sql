DROP DATABASE IF EXISTS hogwarts_db;
CREATE DATABASE hogwarts_db; 

USE hogwarts_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL
); 

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL (10,0), 
    department_id INT, 
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
); 

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) 
    manager_id INT NOT NULL,
);