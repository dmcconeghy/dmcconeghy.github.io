const { MarkovMachine } = require("./markov")


describe('This is my Markov Machine', function () {
    test('Can it make chains?', function() {
        let mm = new MarkovMachine("aa bb cc aa BB aa BB")

        expect(mm.chains).toEqual(new Map([
            ["aa", ["bb", "BB", "BB"]],
            ["bb", ["cc"]],
            ["cc", ["aa"]],
            ["BB", ["aa", null]]]))
    })

    test('Does randomChoice pick an item?', function () {
        expect(MarkovMachine.randomChoice([1,1,1])).toEqual(1);
        expect([1,2,3]).toContain(MarkovMachine.randomChoice([1,2,3]))
    })

    test('Does makeText return all values?', function () {
        let mm = new MarkovMachine("a b c")
        let text = mm.makeText()
        expect(["a b c", "b c", "c"]).toContain(text)
    })

    test('Does our mm split inputs correctly?', function () {
        let sample = ["the cat", "cat in", "in the", "the hat", "hat"]
        let mm = new MarkovMachine("the cat in the hat")
        let result = mm.makeText()
        expect(result.endsWith('hat')).toBe(true)
    
        let output = mm.makeText().split(/[ \r\n]+/)

        for (let i = 0; i < output.length - 1; i++) {
            expect(sample).toContain(output[i] + " " + output[i+1])
        }
    
    })

    test('Does numWords stop things at null?', function () {
        let sample = ["the cat", "cat in", "in the", "the hat", "hat"]
        let mm = new MarkovMachine("the cat in the hat")
        let output = mm.makeText(2)

        let result = output.split(/[ \r\n]+/)
        expect([1, 2]).toContain(result.length)
    })

})