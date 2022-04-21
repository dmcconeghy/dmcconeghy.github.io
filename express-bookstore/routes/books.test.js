const request = require("supertest")

const app = require("../app")
const db = require("../db");

process.env.NODE_ENV = "test"

beforeEach(async () => {
    await db.query("DELETE FROM books")

    await db.query(
        `INSERT INTO books 
            (isbn, amazon_url, author, language, pages, publisher, title, year)
         VALUES (
                '0',
                'http://abc.com',
                'Test Author',
                'english',
                999,
                'Imaginary Press of Testing',
                'Can You Test the Testers?',
                2022
                )`
    );

})

afterAll(async () => {
    await db.end()
})

describe("GET /", function () {

    test("It should return all books", async function () {
        const response = await request(app).get("/books");

        expect(response.body).toEqual(
            {
                "books": [
                    {
                        "isbn": "0",
                        "amazon_url": "http://abc.com",
                        "author": "Test Author",
                        "language": "english",
                        "pages": 999,
                        "publisher": "Imaginary Press of Testing",
                        "title": "Can You Test the Testers?",
                        "year": 2022
                    },
                    
                ]
            }
        );
    })

});

describe("GET /0", function() {

    test("It should return book information", async function () {
        const response = await request(app).get("/books/0");

        expect(response.body).toEqual(
            {
                "book": 
                    {
                        "isbn": "0",
                        "amazon_url": "http://abc.com",
                        "author": "Test Author",
                        "language": "english",
                        "pages": 999,
                        "publisher": "Imaginary Press of Testing",
                        "title": "Can You Test the Testers?",
                        "year": 2022
                    },
                    
            }
        );
    });

    test("It should return a 404 for not found", async function () {
        const response = await request(app).get("/books/999");
        expect(response.status).toEqual(404);
    })
})

describe("POST /", function() {

    test("It should add a book", async function () {
        const response = await request(app)
        .post("/books")
        .send(
            {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
        );
    
        expect(response.body).toEqual(
            {
                "book": {
                        "isbn": "0691161518",
                        "amazon_url": "http://a.co/eobPtX2",
                        "author": "Matthew Lane",
                        "language": "english",
                        "pages": 264,
                        "publisher": "Princeton University Press",
                        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                        "year": 2017
                    }
            }
        );
    })

    test("It should return 500 for conflict", async function () {
        const response = await request(app)
        .post("/books")
        .send(
            {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
        );

        const response2 = await request(app)
        .post("/books")
        .send(
            {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX2",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
        );
    
        expect(response2.status).toEqual(500);
            
    })

    test("It should reject invalid data", async function () {
        const response = await request(app)
        .post("/books")
        .send(
            {
                "isbn": "0691161518",
                "amazon_url": "not a url",
                "author": "Matthew Lane",
                "language": "english",
                "pages": 264,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2017
              }
        );
    
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
            {"error": 
            {"message": ["instance.amazon_url does not conform to the \"uri\" format"], "status": 400}, 
            "message": ["instance.amazon_url does not conform to the \"uri\" format"]
            })
            
    })

    test("It should return a 404 for faulty address", async function () {
        const response = await request(app)
        .post("/books/123")
        .send(
            {
                "isbn": "0",
                "amazon_url": "NOT A URL",
                "author": "Not The Author",
                "language": "english",
                "pages": 999,
                "publisher": "Imaginary Press of Testing",
                "title": "Power-Up",
                "year": 2021
            },
        );

        expect(response.status).toEqual(404);
    })
})

describe("PUT /", function() {

    test("It should update a book", async function () {
        const response = await request(app)
        .put("/books/0")
        .send(
            {
                "isbn": "0",
                "amazon_url": "http://abc.com",
                "author": "Not The Author",
                "language": "english",
                "pages": 999,
                "publisher": "Imaginary Press of Testing",
                "title": "Power-Up",
                "year": 2021
            },
        );

        expect(response.body).toEqual(
            {
                "book": {
                        "isbn": "0",
                        "amazon_url": "http://abc.com",
                        "author": "Not The Author",
                        "language": "english",
                        "pages": 999,
                        "publisher": "Imaginary Press of Testing",
                        "title": "Power-Up",
                        "year": 2021
                    }
            }
        );
    })

    test("It should reject invalid data", async function () {
        const response = await request(app)
        .put("/books/0")
        .send(
            {
                "isbn": "0",
                "amazon_url": "NOT A URL",
                "author": "Not The Author",
                "language": "english",
                "pages": 999,
                "publisher": "Imaginary Press of Testing",
                "title": "Power-Up",
                "year": 2021
            },
        );
    
        expect(response.status).toEqual(400);
        expect(response.body).toEqual(
            {"error": 
            {"message": ["instance.amazon_url does not conform to the \"uri\" format"], "status": 400}, 
            "message": ["instance.amazon_url does not conform to the \"uri\" format"]
            })
            
    })

    test("It should return a Bad request for faulty id", async function () {
        const response = await request(app)
        .put("/books/123")
        .send(
            {
                "isbn": "0",
                "amazon_url": "NOT A URL",
                "author": "Not The Author",
                "language": "english",
                "pages": 999,
                "publisher": "Imaginary Press of Testing",
                "title": "Power-Up",
                "year": 2021
            },
        );

        expect(response.status).toEqual(400);
    })

    

})


describe("DELETE /", function() {

    test("It should delete a book", async function () {
        const response = await request(app)
            .delete("/books/0");

        expect(response.body).toEqual({"message": "Book deleted"});
    });

    test("It should return 404 for not found", async function () {
        const response = await request(app)
            .delete("/book/0");

        expect(response.status).toEqual(404);
    })
})