/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    // Split incoming text on spaces, carriage returns, or line feeds. 
    let words = text.split(/[ \r\n]+/)
    this.words = words.filter(c => c !== "")
    this.makeChains()
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    
      let chains = new Map()

      //for all the words in our text 
      for (let i = 0; i < this.words.length; i += 1) {
        //set first word
        let word = this.words[i]
        //next word unless last
        let nextWord = this.words[i + 1] || null;
        //if the keyword exists, get it and pust the next word into it. 
        if (chains.has(word)) chains.get(word).push(nextWord)
        //otherwise create the keyword and add its next word
        //since words must always been seen once, you can set array here.
        else chains.set(word, [nextWord])
      }
      
      this.chains = chains;
    }
  

  static randomChoice(array) {
   return array[Math.floor(Math.random() * array.length)]
  }

  /** return random text from chains */

  makeText(numWords = 50) {
    // TODO
    
    //get all the keys
    let keys = Array.from(this.chains.keys());
    //pick one at random
    let key = MarkovMachine.randomChoice(keys)
    let result = []

    //if we haven't hit word limit, push the key
    while (result.length < numWords && key !== null) {
      result.push(key)
      //set the key to a random choice of its nextwords
      key = MarkovMachine.randomChoice(this.chains.get(key))
    }
    
    return result.join(" ")
  }  


}

// mm = new MarkovMachine("the cat in the hat with the rat wearing a hat with a cat") 
// mm.makeChains()
// console.log(mm.makeText())

module.exports = { MarkovMachine, }


