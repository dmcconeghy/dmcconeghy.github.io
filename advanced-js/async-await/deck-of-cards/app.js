$(function () {
    let BASEURL = "http://deckofcardsapi.com/api/deck"

    // Console log a single card from a new deck 
    async function first() { 
        let data = await $.getJSON(`${BASEURL}/new/draw`)
        let { suit, value } = data.cards[0];
        console.log("Single Card: ", suit, value)
    }
    
    first()


    // Console.log a single card from a deck
    async function second() {
        let firstCardData = await $.getJSON(`${BASEURL}/new/draw`);
        let deck = firstCardData.deck_id;
        let secondCardData = await $.getJSON(`${BASEURL}/${deck}/draw`);
        [firstCardData, secondCardData].forEach(card => {
          let { suit, value } = card.cards[0];
          console.log(value, "of", suit);
        });
      }

    second()
   

    // Draw through a shuffled deck
    async function third() {
        let $btn = $('button');
        let $table = $('#table')

        let deckData = await $.getJSON(`${BASEURL}/new/shuffle`)

        $btn.show().on('click', async function() {
            $.getJSON(`${BASEURL}/${deckData.deck_id}/draw`)
                let cardData = await $.getJSON(`${BASEURL}/${deckData.deck_id}/draw`)
                let cardSrc = cardData.cards[0].image
                let angle = Math.random() * 90 - 45;
                let randomX = Math.random() * 40 - 20;
                let randomY = Math.random() * 40 - 20;
                $table.append(
                    $('<img>', {
                        src: cardSrc,
                        css: {
                            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                        }
                    })
                );
                if (cardData.remaining === 0) { 
                    $btn.remove() 
                    alert("No more cards")
                }
            })
        }    
    

    third()
    
})



