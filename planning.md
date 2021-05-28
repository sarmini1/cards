App --> GameBoard ---> Card


# GameBoard

Props:
State: 
- deck (should be created upon component load via effect)
- gameStatus (should be changed when first card is drawn and when last is as well)
- cards (should be changed when any card is drawn)

functions
handleClick(evt){
  would include an axios request to get a new card from that deck id
  change the state of the cards array to include that new card
}

ternary or if statement to check if we reached 52 cards to signal end of game

render button, which, when clicked, draws a card
render list of cards via map where the result is a card component for each

# Card

Props: image, value, suit, regular card stuff, key could be from the API card id
State:

returns card div 