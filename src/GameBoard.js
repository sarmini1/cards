import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import EndGameError from './EndGameError';

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

/** GameBoard
 * 
 * Props:
 * State: 
 * - deck, setDeck (what else, if anything, do we need to include here)
 * - gameStatus
 * - cards
 * 
 * App --> GameBoard ---> Card
 * 
 */
function GameBoard() {

  const [deckId, setDeckId] = useState({}); //this will be the deck id itself
  const [gameEnded, setGameEnded] = useState(false);
  const [cards, setCards] = useState([]);

  console.log("start of render, deck is", deckId);
  console.log("start of render, cards are", cards);

  //Gets a new deck from cards API on first render, doesn't load again
  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeckId() {
      const deckResult = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeckId(deckResult.data.deck_id);
    }
    fetchDeckId();
  }, []);

  //Adds new card to cards array
  function updateCards(newCard) {
    setCards(cards => [...cards, newCard]);
  }

  //Handles when new card button clicked-- if no cards, changes game status
  // Otherwise, gets new card and calls updateCards to add new card
  async function handleClick(evt) {
    if (cards.length === 52) {
      console.log("got to end game block");
      setGameEnded(true);
    }
    else {
      const newCardResponse = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
      console.log("card response is", newCardResponse);
      updateCards(newCardResponse.data.cards[0]);
    }
  }

  const cardsToDisplay = cards.map(card => (
    <Card card={card} key={card.code} />
  ));

  return (
    <div>
      {!gameEnded && <div>
        <button onClick={handleClick}>Gimme a card!</button>
        {cardsToDisplay}
      </div>
      }
      {gameEnded && <EndGameError />}
    </div>
  )

}

export default GameBoard;