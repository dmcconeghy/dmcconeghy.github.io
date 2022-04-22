"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Company {
  /** Create a company (from data), update db, return new company data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ handle, name, description, numEmployees, logoUrl }) {
    const duplicateCheck = await db.query(
          `SELECT handle
           FROM companies
           WHERE handle = $1`,
        [handle]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${handle}`);

    const result = await db.query(
          `INSERT INTO companies
           (handle, name, description, num_employees, logo_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
        [
          handle,
          name,
          description,
          numEmployees,
          logoUrl,
        ],
    );
    const company = result.rows[0];

    return company;
  }

  /** Find all companies.
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll() {
    const companiesRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           ORDER BY name`);
    return companiesRes.rows;
  }

   /** Find all companies using optional filters.
   *   data should be { minEmployees = number > 0 < maxEmployees
   *                    maxEmployees = number > 0 > minEmployees
   *                    nameLike = alphanumeric of match(/^[a-z0-9_-]{3,15}$/)
   *                  }   
   *
   * Returns [{ companies }] filtered by any combination of min/max/name.
   * 
   * Failures of invalid input throw custom BadRequestError
   * */

  static async findWithFilters(minEmployees, maxEmployees, nameLike){

    // Check for number inputs only on min/max Employees filter
    if ((maxEmployees && typeof parseInt(maxEmployees) != "number") || 
        (minEmployees && typeof parseInt(minEmployees) != "number")) {
          throw new BadRequestError("Employee filter must be a number")
    }

    // Logic checks for num_employees
    if (maxEmployees && minEmployees > maxEmployees){
      throw new BadRequestError("Minimum Employees can't be greater than Max Employees")

    } else if (minEmployees < 0 || maxEmployees < 0) {
      throw new BadRequestError("Employees can't be fewer than 0!");

    } else if (minEmployees > 5000000 || maxEmployees > 5000000){
      throw new BadRequestError("No company in the world is that big!")
    }

    // RegExp check for valid characters 
    if(nameLike){
      try {
        nameLike.match(/^[a-z0-9_-]{3,15}$/)
      } catch(err){
        throw new BadRequestError("Name searches must be alpha numerics strings under 15 characters.")
      }
    }

    // Only return nameLike matches
    if (!minEmployees && !maxEmployees && nameLike){
      
      const companiesRes = await db.query(
        `SELECT handle, 
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoURL"
         FROM companies
         WHERE name ILIKE $1
         ORDER BY name`, [`%${nameLike}%`]);

      return companiesRes.rows

    // return only companies below the max or above the min or between the range of min-max
    } else if (!nameLike) {

        // return only companies below a max
        if (!minEmployees) {

          const companiesRes = await db.query(
          `SELECT handle, 
                name,
                description,
                num_employees AS "numEmployees",
                logo_url AS "logoURL"
          FROM companies
          WHERE num_employees <= $1
          ORDER BY num_employees, name`, 
          [maxEmployees]);

         return companiesRes.rows

        // return only companies above a min
        } else if (!maxEmployees){

          const companiesRes = await db.query(
          `SELECT handle, 
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoURL"
          FROM companies
          WHERE num_employees >= $1
          ORDER BY num_employees, name`, 
          [minEmployees]);

          return companiesRes.rows

          // Return companies between a min and max
        } else {
          
          const companiesRes = await db.query(
            `SELECT handle, 
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoURL"
             FROM companies
             WHERE num_employees BETWEEN $1 AND $2
             ORDER BY num_employees, name`,
             [minEmployees, maxEmployees])
          return companiesRes.rows
        }

        // return companies between a min/max with a namelike match
    } else {


      const companiesRes = await db.query(
        `SELECT handle, 
              name,
              description,
              num_employees AS "numEmployees",
              logo_url AS "logoURL"
         FROM companies
         WHERE name ILIKE $1 AND num_employees BETWEEN $2 AND $3
         ORDER BY name, num_employees`,
         [`%${nameLike}%`, minEmployees, maxEmployees])
      return companiesRes.rows
    }
  }


  /** Given a company handle, return data about company.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity, companyHandle }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(handle) {
    const companyRes = await db.query(
          `SELECT handle,
                  name,
                  description,
                  num_employees AS "numEmployees",
                  logo_url AS "logoUrl"
           FROM companies
           WHERE handle = $1`,
        [handle]);

    const company = companyRes.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Update company data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes with provided data.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async update(handle, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {
          numEmployees: "num_employees",
          logoUrl: "logo_url",
        });
    const handleVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE companies 
                      SET ${setCols} 
                      WHERE handle = ${handleVarIdx} 
                      RETURNING handle, 
                                name, 
                                description, 
                                num_employees AS "numEmployees", 
                                logo_url AS "logoUrl"`;
    const result = await db.query(querySql, [...values, handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);

    return company;
  }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(handle) {
    const result = await db.query(
          `DELETE
           FROM companies
           WHERE handle = $1
           RETURNING handle`,
        [handle]);
    const company = result.rows[0];

    if (!company) throw new NotFoundError(`No company: ${handle}`);
  }
}


module.exports = Company;
