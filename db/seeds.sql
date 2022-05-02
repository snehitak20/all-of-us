INSERT INTO department(name)
VALUES  ("Attackers"),
        ("Defense"),
        ("Setters"),
        ("Bench"),
        ("Coaching");

INSERT INTO role (title, salary, department_id)
VALUES  ("Outside Hitter", 180000, 1),
        ("Right-side Hitter", 90000, 1),
        ("Middle Hitter", 95000, 1), 
        ("Setter", 100000, 3),
        ("Back-row Setter", 100000, 3),
        ("The Dark Lord", 400000, 2),
        ("Defensive Specialist", 140000, 2),
        ("Serving Specialist", 75000, 1),
        ("Cheerleader", 85000, 4),
        ("Statskeeper", 92000, 4),
        ("Head Coach", 150000, 5),
        ("Assistant Coach", 125000, 5),
        ("Queen", 400000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Minerva", "McGonogall", 1, NULL),
        ("Hermione", "Granger", 1, 1),
        ("Harry", "Potter", 2, 1),
        ("Neville", "Longbottom", 3, 1),
        ("Ronald", "Weasley", 3, 1),
        ("Severus", "Snape", 4, NULL),
        ("Draco", "Malfoy", 5, 6),
        ("Lord", "Voldemort", 6, NULL),
        ("Bellatrix", "Lestrange", 7, 8),
        ("Lucius", "Malfoy", 8, 8),
        ("Colin", "Creevey", 9, NULL),
        ("Narcissa", "Malfoy", 10, 13),
        ("Albus", "Dumbledore", 11, NULL),
        ("Luna", "Lovegood", 13, NULL);