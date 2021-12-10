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
        $(".words", this.board).append($("<li>", { text: word }));
      }
    // We use the /validate route to pass JSON with the server's reply about a word submission
    

    async handleSubmission(evt){
        // Do not reload page when a word is submitted
        evt.preventDefault();
        const $word = $(".word", this.board);

        let word = $word.val();
        
        // empty submissions not allowed
        if (!word) {
            return;
        }

        // logic for already found words
        if (this.words.has(word)){
            //reply with message already found
            return;
        }

        //logic for words not already found
        const response = await axios.get("/validate", { params: { word: word }});


        if (response.data.result === "not-word"){
            //reply with error for non-word
            console.log("That isn't a word.")
        } else if (response.data.result === "not-on-board"){
            //reply with error for duplicate word
            console.log("That word isn't on this board.")
        } else {
            this.listWords(word);
            this.words.add(word);
            //reply with success message
            //calculate score
        }

        //no matter what's entered, clear for the next entry
        $word.val("").focus()
    }
}