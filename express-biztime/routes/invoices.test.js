const request = require("supertest")

const app = require("../app")
const { createFakeData } = require("../_test-common")
const db = require("../db");

beforeEach(createFakeData)

afterAll(async () => {
    await db.end()
})

describe("GET /", function () {

    test("It should return all invoices", async function () {
        const response = await request(app).get("/invoices");

        expect(response.body).toEqual({
            "invoices": [
                {
                    "id": 1,
                    "comp_code": "walmart"
                },
                {
                    "id": 2,
                    "comp_code": "walmart"
                },
                {
                    "id": 3,
                    "comp_code": "target"
                },
                {
                    "id": 4,
                    "comp_code": "tripadvisor"
                }
            ]
        })
    })


})

describe("GET /:id", function () {

    test("It should return all details for an invoice", async function () {
        const response = await request(app).get("/invoices/1");

        expect(response.body).toEqual({
            "invoice": {
                "id": 1,
                "company": {
                    "code": "walmart",
                    "name": "Walmart",
                    "description": "The mart of walls"
                },
                "amt": 100,
                "paid": false,
                "add_date": "2021-01-01T05:00:00.000Z",
                "paid_date": null
            }
        })
    })

    test("It should return a 404 for not found", async function () {
        const response = await request(app).get("/invoices/1234");
        
        expect(response.status).toEqual(404);
    })

})

describe("POST /", function() {

    test("It should add an invoice", async function () {
        const response = await request(app)
        .post("/invoices")
        .send({
            comp_code: "target", 
            amt: 999,
            paid: true,
            add_date: '2020-02-02',
            paid_date: '2020-03-03'
        });
    

        expect(response.body).toEqual(
            {
                "invoice": {
                    "comp_code": "target",
                    "amt": 999,
                    "paid": false,
                    "add_date": "2022-04-13T04:00:00.000Z",
                    "paid_date": null
                }
            }
        );
    })
})

describe("PUT /id", function() {

    test("It should update an invoice", async function () {
        const response = await request(app)
            .put("/invoices/1")
            .send({
                comp_code: "walmart",
                amt: 100,
                paid: true,
                add_date: "2021-01-01",
                paid_date: "2022-02-02"
                });
    

        expect(response.body).toEqual(
            {
                "invoice": {
                    "comp_code": "walmart",
                    "amt": 100,
                    "paid": true,
                    "add_date": "2021-01-01T05:00:00.000Z" 
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

    test("It should delete an invoice", async function () {
        const response = await request(app)
            .delete("/invoices/1");

        expect(response.body).toEqual({"status": "deleted"});
    });

    test("It should return 404 for not found", async function () {
        const response = await request(app)
            .delete("/invoices/1234");

        expect(response.status).toEqual(404);
    })
})