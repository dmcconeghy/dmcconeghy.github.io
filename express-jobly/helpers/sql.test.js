// 

const { BadRequestError } = require("../expressError")
const { sqlForPartialUpdate } = require("./sql")

describe("Returns with invalid data", function() {
    test("fails with no data", function(){
        try {
            sqlForPartialUpdate({}, {})
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
        
    })

    test("fails with bad input data fields", function(){
        try {
            sqlForPartialUpdate({firstBLAME: "terrible"}, {firstName: "first_name"})
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })

    test("fails with bad database data fields", function(){
        try {
            sqlForPartialUpdate({firstName: "terrible"}, {firstName: "first_blame"})
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })

})

describe("Returns with valid data", function() {
    test("returns correct output", function(){
        
        const response = sqlForPartialUpdate({firstName: 'Aliya', age: 32}, {firstName: "first_name", age:"age"})

        expect(response).toEqual(
            {"setCols": "\"first_name\"=$1, \"age\"=$2", "values": ["Aliya", 32]}
        )
                
    })
})