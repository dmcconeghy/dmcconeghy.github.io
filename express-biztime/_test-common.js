/** Shared code for tests */

const db = require("./db");

async function createFakeData() {
    await db.query("DELETE FROM invoices")
    await db.query("DELETE FROM companies")
    await db.query("DELETE FROM industries")
    await db.query("DELETE FROM companyindustry")

    await db.query(
        `INSERT INTO companies (code, name, description)
                    VALUES ('walmart', 'Walmart', 'The mart of walls'),
                            ('target', 'Target', 'Bullseye'),
                            ('tripadvisor', 'Tripadvisor', 'Trips made better')`);
    
    await db.query(
        `INSERT INTO invoices (id, comp_code, amt, paid, add_date, paid_date)
         VALUES (1, 'walmart', 100, false, '2021-01-01', null),
                (2, 'walmart', 200, true, '2021-02-01', '2021-03-01'),
                (3, 'target', 300, false, '2021-01-01', null),
                (4, 'tripadvisor', 400, true, '2021-02-01', '2021-04-01')`);

    await db.query(
        `INSERT INTO industries (code, industry)
         VALUES ('ret', 'retail'),
                ('tra', 'travel')`);
    
    await db.query(
        `INSERT INTO companyindustry (comp_code, indu_code)
         VALUES ('walmart', 'ret'),
                ('tripadvisor', 'tra')`);
}

module.exports = { createFakeData };