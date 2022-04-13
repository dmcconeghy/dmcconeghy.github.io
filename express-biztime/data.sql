\c biztime

DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS companyindustry;

CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.'),
         ('pear', 'Pearson', 'Textbook Mogul');

INSERT INTO invoices (comp_code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null),
         ('pear', 500, true, '2021-01-01');

CREATE TABLE industries (
  code text PRIMARY KEY,
  industry text
);

CREATE TABLE companyindustry (
  comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
  indu_code text NOT NULL REFERENCES industries ON DELETE CASCADE
);

INSERT INTO industries
  VALUES ('acct', 'Accounting'),
         ('tech', 'Technology'),
         ('fin', 'Finance'),
         ('edu', 'Education');

INSERT INTO companyindustry
  VALUES ('apple', 'tech'),
         ('ibm', 'fin'),
         ('pear', 'edu'),
         ('pear', 'acct');