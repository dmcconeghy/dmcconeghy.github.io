const request = require("supertest")

const app = require("../app")
const { createFakeData } = require("../_test-common")
const db = require("../db");

beforeEach(createFakeData)

afterAll(async () => {
    await db.end()
})

describe("GET /industries", function () {

    test("It should return industries", async function () {
        const response = await request(app).get("/industries");

        expect(response.body).toEqual({
            "industries": [
                {
                    "industry": "retail",
                    "name": "Walmart"
                },
                {
                    "industry": "travel",
                    "name": "Tripadvisor"
                }
            ]
        });
    })

});

describe("POST /", function() {

    test("It should add a new industry", async function () {
        const response = await request(app)
            .post("/industries")
            .send({code: "fin", industry: "finance"})

        expect(response.body).toEqual(
            {
                "industry": {
                    "code": "fin",
                    "industry": "finance"
                }
            }
        )

        expect(response.statusCode).toEqual(201)
    })

})

describe("PUT /", function() {

    test("It should update an industry", async function () {
        const response = await request(app)
            .put("/industries/ret")
            .send({code: "retEdit", industry: "retailEdit"});
    

        expect(response.body).toEqual(
            {
                "industry": {
                    code: "ret",
                    industry: "retailEdit"
                }
            }
        );
    })


    test("It should return a 404 when trying to put a non-existant industry", async function () {
        const response = await request(app)
            .put("/industries/1234")
            .send({code: "1234", industry: "1234"});
        expect(response.status).toEqual(404);
    })

});

