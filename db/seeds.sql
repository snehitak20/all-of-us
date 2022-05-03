INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Marketing"),
        ("Sales");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES  ("Software Engineer", 150000, 1),
        ("Project Manager", 180000, 1),
        ("Engineering Manager", 225000, 1),
        ("Accountant", 140000, 2),
        ("Accounting Manager", 235000, 2),
        ("Product Marketing Manager", 180000, 3),
        ("Marketing Lead", 150000, 3),
        ("Sales Representative", 100000, 4);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Albus", "Dumbledore", 3, NULL),
    ("Minerva", "McGonagall", 3, 1),
    ("Harry", "Potter", 1, 2),
    ("Hermione", "Granger", 1, 2),
    ("Luna", "Lovegood", 2, 1);

SELECT * FROM employee;