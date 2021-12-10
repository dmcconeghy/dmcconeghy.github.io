//Wrapping the JS in a class allows us to use .this to simplify variable handling
class Boggle {

    constructor(id){
        //has no words on creation, words must be unique
        this.words = new Set()
        this.board = $("#" + id)

        // Using the .add-word we set the event handler for word submission
        $(".add-word", this.board).on("submit", this.handleSubmission.bind(this))
    }

    listWords(word) {
        $(".words", this.board).append($("<li>", {text: word}));
    }

    // We use the /validate route to pass JSON with the server's reply about a word submission
    // This must be async because we have to wait on the server's reply about each checked word

    async handleSubmission(evt){
        // Do not reload page when a word is submitted
        evt.preventDefault();
        const $word = $("submit_word", this.board);

        let word = $word.val();

        // empty submissions not allowed
        if (!word) return;

        //logic for words already found

        const response = await axios.get("/validate", { params: {word: word}});
        if (response.data.result === "not-word"){
            //reply with error for non-word
            alert("That isn't a word.")
        } else if (response.data.result === "not-on-board"){
            //reply with error for duplicate word
            alert("That word isn't on this board.")
        } else {
            //valid word
            alert("You found a word.")
            //calculate score
            //add word to bank
        }
    }
}