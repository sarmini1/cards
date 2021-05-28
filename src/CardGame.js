import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import EndGameError from './EndGameError';

const BASE_URL = "https://deckofcardsapi.com/api/deck/";

/** CardGame
 * 
 * Props:
 * State: 
 * - deckId, setDeckId
 * - gameStatus
 * - cards
 * 
 * App --> CardGame ---> Card
 * 
 */
function CardGame() {

  const [deckId, setDeckId] = useState({}); //this will be the deck id itself
  const [gameEnded, setGameEnded] = useState(false);
  const [cards, setCards] = useState([]);
  const [shuffling, setShuffling] = useState(false)

  console.log("start of render, deck is", deckId);
  console.log("start of render, cards are", cards);

  //Gets a new deck from cards API on first render, doesn't load again
  useEffect(function fetchDeckWhenMounted() {
    async function fetchDeckId() {
      const deckResult = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeckId(deckResult.data.deck_id);
    }
    fetchDeckId(); //TODO - could get more than just the id, response gives us back the first card as well
  }, []);

  //Adds new card to cards array
  function updateCards(newCard) {
    setCards(cards => [...cards, newCard]); //TODO-don't need to make this a function
  }

  //Handles when new card button clicked-- if no cards, changes game status
  // Otherwise, gets new card and calls updateCards to add new card
  async function handleClick(evt) {
    if (cards.length === 52) {
      console.log("got to end game block");
      setGameEnded(true);
      //TODO - return, could just use this to avoid needing the else
    }
    else {
      //wrap await in a try/catch
      const newCardResponse = await axios.get(`${BASE_URL}${deckId}/draw/?count=1`);
      // TODO- could check the card response to see if any cards are remaining and if not, throw error
      console.log("card response is", newCardResponse);
      updateCards(newCardResponse.data.cards[0]); //this may not need to be a function call itself
    }
  }

  //Handle when shuffle button clicked - shuffles current deck, 
  //empties cards from array
  useEffect(function shuffleDeck() {
    async function shuffleDeckId() {
      try {
        await axios.get(`${BASE_URL}${deckId}/shuffle/`);
        setCards([]);
        setShuffling(false);
      } catch (err) {
        console.log(err);
      }
    }
    //TODO - reconfigure so shuffling only happens when shuffling=true
    shuffleDeckId();
  }, [shuffling, deckId])
  

  async function handleShuffle(evt) {
    setShuffling(true)
  }

  const cardsToDisplay = cards.map(card => (
    <Card card={card} key={card.code} /> // TODO-could destructure the card properties to be more particular
  ));

  return (
    <div>
      {!gameEnded && <div>
        <button onClick={handleClick}>Gimme a card!</button>
        <button onClick={handleShuffle} disabled={shuffling}>Shuffle that deck!</button>
        {cardsToDisplay}
      </div>
      }
      {gameEnded && <EndGameError />} 
    </div>
  )
      // TODO- in the return above, could make the conditional rendering occur from a function instead 
}

export default CardGame;