$(function () {
    let BASEURL = "http://deckofcardsapi.com/api/deck"

    // Console log a single card from a new deck 
    $.getJSON(`${BASEURL}/new/draw`).then(data => {
        let { suit, value } = data.cards[0];
        console.log("Single Card: ", suit, value)
    })



    // Console.log a single card from a deck
    let firstCard = null;
    $.getJSON(`${BASEURL}/new/draw`).then(data => 
        {
        firstCard = data.cards[0];
        let deck_id = data.deck_id;
        return $.getJSON(`${BASEURL}/${deck_id}/draw`)
    }).then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log("Same deck single card: ", card.value, card.suit)
        })
    })

    // Draw through a shuffled deck

    let deck = null;
    let $btn = $('button');
    let $table = $('#table')

    $.getJSON(`${BASEURL}/new/shuffle`).then(data => {
        deck = data.deck_id
        $btn.show()
    });

    $btn.on('click', function(){
        $.getJSON(`${BASEURL}/${deck}/draw`).then(data => {
            let cardSrc = data.cards[0].image
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
            if (data.remaining === 0) { 
                $btn.remove() 
                alert("No more cards")
            }
        })
    })
})



