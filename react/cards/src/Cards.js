import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Card from './Card';

function Cards() {

    const [deck, setDeck] = useState(null)
    const [autoDraw, setAutoDraw] = useState(false)
    const [drawnCard, setDrawnCard] = useState([])
    const timerRef = useRef(null)

    // Get a deck and set it into state
    useEffect(()=> {
        async function fetchDecks() {
            const response = await axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/`)
            setDeck(response.data)
        }
        fetchDecks()
    }, [setDeck])
    
    // Draw a card

    useEffect(() => {
        async function drawDeck() {
            const { deck_id } = deck

            try {
                let drawnCardResponse = await axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw`)

                if (drawnCardResponse.data.remaining === 0) {
                    setAutoDraw(false)
                    throw new Error("Deck is empty!")
                }

                const card = drawnCardResponse.data.cards[0]

                setDrawnCard(c => [
                    ...c, {
                        id: card.code,
                        name: card.suit + " " + card.value,
                        image: card.image
                    }
                ])
            } catch(err){
                alert(err)
            }
        }
    
        //logic for autoDraw and timer
        if (autoDraw && !timerRef.current) {
            timerRef.current = setInterval(async () => {
                await drawDeck()
            }, 1000)
        }

        return () => {
            clearInterval(timerRef.current)
            timerRef.current = null
        }
    }, [autoDraw, setAutoDraw, deck])

    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto)
    }

    const cards = drawnCard.map(c => (
        <Card key={c.id} name={c.name} image={c.image} />
    ))

  return <div className="Board">
      { deck ? (
          <button className="Auto-Draw-Button" onClick={toggleAutoDraw}>
            {autoDraw ? "STOP" : "KEEP"} Drawing cards for me!
          </button>
      ) : null}
      <div className="PlayingArea">{cards}</div>
      
  </div>;
}

export default Cards;
