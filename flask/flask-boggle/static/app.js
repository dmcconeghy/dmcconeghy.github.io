//Wrapping the JS in a class allows us to use .this to simplify variable handling
class Boggle {

    constructor(id){
        //has no words on creation, words must be unique
        this.words = new Set()
        this.board = $("#" + id)

        // Using the .submit-word form we set the event handler for word submission
        $(".submit-word", this.board).on("submit", this.handleSubmission.bind(this))
    }

    listWords(word) {
        $(".words", this.board).append($("<li>", {text: word}));
    }

    // We use the /validate route to pass JSON with the server's reply about a word submission
    // This must be async because we have to wait on the server's reply about each checked word

    async handleSubmission(evt){
        // Do not reload page when a word is submitted
        evt.preventDefault();
        const $word = $(".word", this.board);

        let word = $word.val();
        

        // empty submissions not allowed
        if (!word) {
            return;
        }

        //logic for words already found
        const response = await axios.get("/validate", { params: { word: word }});
        console.log(response)
        if (response.data.result === "not-word"){
            //reply with error for non-word
            console.log("That isn't a word.")
        } else if (response.data.result === "not-on-board"){
            //reply with error for duplicate word
            console.log("That word isn't on this board.")
        } else {
            //valid word
            console.log("You found a word.")
            //calculate score
            //add word to bank
        }
    }
}