"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   * */

  static async create({ title, salary, equity, company_handle }){
    const duplicateCheck = await db.query(
        `SELECT title
         FROM jobs
         WHERE title = $1 AND 
         company_handle = $2`,
         [title, company_handle]);
    
    if (duplicateCheck.rows[0]){
        throw new BadRequestError(`Duplicate job at ${company_handle} named ${title}`);
    }

    const result = await db.query(
        `INSERT INTO jobs
        (title, salary, equity, company_handle)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
        [ title, salary, equity, company_handle]
    )
    
    const job = result.rows[0];

    return job;
  }

   /** Find all jobs.
   *
   * Returns [{ title, salary, equity, company_handle }, ...]
   * */

   static async findAll() {
       const jobsRes = await db.query(
           `SELECT title, salary, equity, company_handle AS "companyHandle"
           FROM jobs
           ORDER BY company_handle, title`);
        
        return jobsRes.rows
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
   * 
   * ADD THIS
   * 
   * */




   /** Given a job id, return data about job.
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws NotFoundError if not found.
   **/

    static async get(id){
        const jobRes = await db.query(
            `SELECT id, title, salary, equity, company_handle AS "companyHandle"
            FROM jobs
            WHERE id = $1`,
            [id]);

        const job = jobRes.rows[0];

        if (!job) throw new NotFoundError(`No matching jobs found`)

        return job
    }

    static async update(id, data){
        const { setCols, values } = sqlForPartialUpdate(
            data, {
                title: "title",
                salary: "salary",
                equity: "equity",
            });
        
        const handleVarIdx = "$" + (values.length + 1);

        const querySql =    `UPDATE jobs
                             SET ${setCols}
                             WHERE id = ${handleVarIdx}
                             RETURNING  id, 
                                        title,
                                        salary,
                                        equity,
                                        company_handle AS "companyHandle"`;
        const result = await db.query(querySql, [...values, id]);
        const job = result.rows[0]

        if (!company) throw new NotFoundError('No matching job to edit')

        return job
    }

    /** Delete given company from database; returns undefined.
    *
    * Throws NotFoundError if company not found.
    **/

    static async remove(id) {
        const result = await db.query(
            `DELETE
             FROM jobs
             WHERE id = $1
             RETURNING title, company_handle AS "companyHandle"`,
             [id]);
        const job = result.rows[0];

        if (!job) throw new NotFoundError('Job not found.')
    }
}

module.exports = Job