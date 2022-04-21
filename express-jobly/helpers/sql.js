const { BadRequestError } = require("../expressError");

// For db updates that do not require or include all non-required fields
// Use the following generator to create the appropriate SQL queries. 
// Error check for no data first, 
// Then proceed for each provided key-value pair
// Assign the key its corresponding value
// Join the query and return the query plus the values we're updating. 

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
