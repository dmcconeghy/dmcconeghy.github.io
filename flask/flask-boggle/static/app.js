//Wrapping the JS in a class allows us to use .this to simplify variable handling
class Boggle {

    constructor(id){
        //has no words on creation, words must be unique
        this.words = new Set()
        // ID of game board matches container div where app.py places the board
        this.board = $("#" + id)
        this.score = 0

        // Using the .submit-word form we set the event handler for word submission
        // binding this means we're always referring to this particular board we've created on the DOM
        $(".submit-word", this.board).on("submit", this.handleSubmission.bind(this))
    }

    //adds words as li members of a ul .words
    listWords(word) {
        $(".words", this.board).append($("<li>", { text: word }));
    }
    
    //Shows different messages in player HUD
    showMessages(message, clss){
        //add the inputted message, remove the previous class and add the new .msg .class
        $(".msg", this.board)
        .text(message)
        .removeClass()
        .addClass(`msg ${clss}`);
    }

    // This method returns an individual word's score
    computeScore(word) {
        let wordScore = word.length;
        return wordScore;
    }

    // This method updates a player's score for the round
    updateScore(word) {
        this.score += this.computeScore(word);
        $("#score", this.board).text(`Current Score: ${this.score}`)
    }

    //This event handler validates submissions
    // It checks if the entry is not empty or not already present in found wordbank
    // It then checks if the entry is on the board and if it is a valid word
    // If is new and unique, it adds it to the bank and updates the wordbank and score
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
        // We use the /validate route to pass JSON with the server's reply about a word submission
        const response = await axios.get("/validate", { params: { word: word }});

        if (response.data.result === "not-word"){
            //reply with error for non-word
            this.showMessages(`${word} is not a valid entry`, "err");
        
        } else if (response.data.result === "not-on-board"){
            //reply with error for duplicate word
            this.showMessages(`${word} is not found on this board`, "err");
            
        } else {
            //add to DOM
            this.listWords(word);
            //add to words set
            this.words.add(word);
            //update score
            this.updateScore(word)
            //reply with success message
            this.showMessages(`"${word}" scores ${this.computeScore(word)} points`, "ok")

        }

        //no matter what's entered, clear for the next entry
        $word.val("").focus()
    }
}