const request = require("supertest")

const app = require("../app")
const { createFakeData } = require("../_test-common")
const db = require("../db");

beforeEach(createFakeData)

afterAll(async () => {
    await db.end()
})

describe("GET /", function () {

    test("It should return all companies", async function () {
        const response = await request(app).get("/companies");

        expect(response.body).toEqual({
            "companies": [
                {
                    "code": "target",
                    "name": "Target"
                },
                {
                    "code": "tripadvisor",
                    "name": "Tripadvisor"
                },
                {
                    "code": "walmart",
                    "name": "Walmart"
                }
            ]
        });
    })

});

describe("GET /walmart", function() {

    test("It should return company information", async function () {
        const response = await request(app).get("/companies/walmart");

        expect(response.body).toEqual(
            {
                "company": {
                    "code": "walmart",
                    "name": "Walmart",
                    "description": "The mart of walls",
                    "invoices": [
                        1, 
                        2,
                    ],
                    "industries": []

                }
            }
        )
    })

    test("It should return a 404 for not found", async function () {
        const response = await request(app).get("/companies/1234");
        expect(response.status).toEqual(404);
    })
})

describe("POST /", function() {

    test("It should add a company", async function () {
        const response = await request(app)
        .post("/companies")
        .send({name: "Test", description: "Mic-1-2-3"});
    

        expect(response.body).toEqual(
            {
                "company": {
                    code: "test",
                    name: "Test",
                    description: "Mic-1-2-3",
                }
            }
        );
    })

    test("It should return 500 for conflict", async function () {
        const response = await request(app)
            .post("/companies")
            .send({name: "Walmart", description: "Duplicate?"});
    
        expect(response.status).toEqual(500);
      })
})

describe("PUT /", function() {

    test("It should update company", async function () {
        const response = await request(app)
            .put("/companies/walmart")
            .send({name: "WalmartEdit", description: "No walls here"});
    

        expect(response.body).toEqual(
            {
                "company": {
                    code: "walmart",
                    name: "WalmartEdit",
                    description: "No walls here",
                }
            }
        );
    })

    test("It should return a 404 for not found", async function () {
        const response = await request(app)
            .put("/companies/1234")
            .send({name: "1234"});
        expect(response.status).toEqual(404);
    })

});

describe("DELETE /", function() {

    test("It should delete company", async function () {
        const response = await request(app)
            .delete("/companies/walmart");

        expect(response.body).toEqual({"status": "deleted"});
    });

    test("It should return 404 for not found", async function () {
        const response = await request(app)
            .delete("/companies/1234");

        expect(response.status).toEqual(404);
    })
})