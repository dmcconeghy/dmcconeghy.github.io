const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError")

let router = new express.Router();

router.get("/", async function(req, res, next) {
    try {

        const industryResult = await db.query(
            `SELECT i.industry, c.name 
             FROM industries AS i
             LEFT JOIN companyindustry AS ci
             ON i.code = ci.indu_code
             LEFT JOIN companies AS c
             ON ci.comp_code = c.code`,
             );
        
        // These efforts to combine industries don't work     
        // const companies = industryResult.rows.map(r => [r.industry, r.name])
        // const { industry, name } = industryResult.rows[0]
        // const results = {}
        // for (row in industryResult) {
        
        //     if (!Object.hasOwn(results, industry)){
        //     } else {
        //         value = results[industry]
        //         value.push(name)
        //         results[industry] = value
        //     }
        // }

        // console.log(results)
        
        if (industryResult.rows.length === 0){
            throw new ExpressError(`Industry code ${code} not found`, 404);
        }
        
        return res.json({"industries": industryResult.rows})

    } catch (err) {

        return next(err)
    }
})

router.post("/", async function(req, res, next) {
    try {

        const { code, industry } = req.body;
        
        const result = await db.query(
            `INSERT INTO industries (code, industry)
             VALUES($1, $2)
             RETURNING code, industry`,
             [code, industry]
        );

        return res.status(201).json({"industry": result.rows[0]});

    } catch(err) {

        return next(err)
    }
})

router.put("/:code", async function(req, res, next) {
    try {

        const { industry } = req.body;
        const code = req.params.code;

        const result = await db.query(
            `UPDATE industries
             SET industry=$2 
             WHERE code = $1
             RETURNING code, industry`,
             [code, industry]
        );

        if (result.rows.length === 0){
            throw new ExpressError(`Industry code ${code} doesn't exist`, 404);
        } else {
            return res.json({"industry": result.rows[0]});
        }

    } catch (err) {

        return next(err)
    }
})



module.exports = router; 