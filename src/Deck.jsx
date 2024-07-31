import React, {useState, useEffect, useRef} from "react";
import Card from "./Card";


function Deck () {
    const deckIdRef = useRef();

    //a card will be an object that will hold following data: suit, value, image
    const [cards, setCards] = useState([]);

    //used to determine if deck of cards is being shuffled
    const [shuffling, setShuffling] = useState(false);

    // will shuffle only once at react app start up
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
            const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/draw/?count=1`);
            const data = await response.json();
            setCards(cards => [...cards, data.cards[0]]);
        }
        fetchCard();
    }

    // reshuffle the current deck and clear the screen of cards
    function handleshuffle () {
        async function ReshuffleCards () {
            setShuffling(true);
            await fetch(`https://deckofcardsapi.com/api/deck/${deckIdRef.current}/shuffle/`);
            setCards([]);
            setShuffling(false);
        }
        ReshuffleCards();
    }

    //make card components from cards state
    const currentCardComponents = cards.map(card => (
        <Card 
        key={card.code}
        src={card.image}/>
    ));

    return (
        <div>
            {shuffling ? 
            <h2>Shuffling Cards</h2> :
            <button onClick={handleshuffle}>Reshuffle Cards</button>}

            {cards.length < 52 ? 
            <button onClick={handleClick}>New Card</button> :
            <h2>No More Cards</h2>}
            {currentCardComponents}
        </div>

    )
}

export default Deck;