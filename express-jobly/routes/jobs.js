"use strict";

/** Routes for companies. */

const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");

// const jsonschema = require("jsonschema");
// const jobNewSchema = require("../schemas/jobNew.json");
// const jobUpdateSchema = require("../schemas/jobUpdate.json");

const router = new express.Router();

/** POST / { job } =>  { job }
 *
 * job should be { title, salary, equity, company_handle }
 *
 * Returns { id, title, name, description, numEmployees, logoUrl }
 *
 * Authorization required: login & admin
 */

router.post("/", ensureAdmin, async function(req, res, next){
    try {
        const validator = jsonschema.validate(req.body, jobNewSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const job = await Job.create(req.body);
        return res.status(201).json({ job });
    } catch (err){
        return next(err);
    }
});

/** GET /  =>
 *   { jobs: [ { id, title, salary, equity, company_handle }, ...] }
 *
 * Can filter on provided search filters:
 * - minSalary
 * - hasEquity (boolean if T filter, if F list all)
 * - titleLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function(req, res, next) {
    try {
        const minSalary = req.query.minSalary || null;
        const hasEquity = req.query.hasEquity || false;
        const titleLike = req.query.titleLike || null;

        //return all if no filters selected
        if (!minSalary && !hasEquity && !titleLike){
            const jobs = await Job.findAll();
            // console.log("I ran no parameters")
            return res.json({ jobs })
        } else {
            const jobs = await Job.findWithFilters(minSalary, hasEquity, titleLike)
            //console.log("I ran some parameters")
            return res.json({ jobs })
        }
    } catch (err){
        return next(err);
    }
});

/** GET /[id]  =>  { job }
 *
 *  Job is { id, title, salary, equity, company_handle }
 *
 * Authorization required: none
 */

router.get("/:id", async function(req, res, next){
    try {
        const job = await Job.get(req.params.id)

        return res.json({job})
    } catch (err) {
        return next(err);
    }
});

/** PATCH /[id] { fld1, fld2, ... } => { job }
 *
 * Patches job data.
 *
 * fields can be: { title, salary, equity }
 *
 * Returns { id, title, salary, equity, company_handle }
 *
 * Authorization required: login & admin
 */

router.patch("/:id", ensureAdmin, async function(req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, jobUpdateSchema);
        if (!validator.valid){
            const errs = validtor.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const job = await Job.update(req.params.id, req.body);
        return res.json({ job });
    } catch (err){
        return next(err);
    }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: login & admin
 */

router.delete("/:id", ensureAdmin, async function(req, res, next){
    try {
        await Job.remove(req.params.id);
        return res.json({deleted: req.params.id});
    } catch (err){
        return next(err);
    }
});

module.exports = router;