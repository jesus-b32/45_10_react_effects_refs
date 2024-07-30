import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";



function Deck () {
    const deckIdRef = useRef();

    //a card will be an object that will hold following data: suit, value, image
    const [cards, setCards] = useState([]);

    useEffect (function shuffleCardsWhenMounted () {
        async function shuffleCards() {
            const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
            const data = await response.json();
            deckIdRef.current = data.deck_id;
        }
        shuffleCards();
    }, [])

    //update state by adding current cards and newCard, made from form API, to setState
    function handleClick () {
        async function fetchCard () {
            console.log(deckIdRef.current);
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`);
            const data = await response.json();
            setCards(cards => [...cards, data.cards[0]]);
        }
        fetchCard();
        // const newCard = fetchCard();
        // setCards(cards => [...cards, newCard]);
    }

    const currentCardComponents = cards.map(card => (
        <Card src={card.image}/>
    ));

    return (
        <div>
            <button onClick={handleClick}>New Card</button>
            {currentCardComponents}
        </div>

    )
}

export default Deck;