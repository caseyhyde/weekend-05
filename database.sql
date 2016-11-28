CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    employee_id INTEGER,
    job_title VARCHAR(255),
    annual_salary INTEGER,
    active BOOLEAN DEFAULT TRUE
);

INSERT INTO employees
(first_name, last_name, employee_id, job_title, annual_salary)
VALUES ('Casey', 'Hyde', 666, 'God Among Men', 75000),
('John', 'Travolta', 444, 'Commercial Walleye Fisherman', 1000000),
('Nimwalt', 'VonSlappenstinger', 1, 'Walleye', 80);
