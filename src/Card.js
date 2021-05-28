import React from 'react';

/**Card
 * 
 * Props: card: {image, value, suit}
 * State: none
 * 
 * App ---> GameBoard ---> Card
 */
function Card({ card }) {//pass in only what we need

  console.log("card image is", card.image);
  return (<div>
    <img src={card.image} alt={`${card.value} of ${card.suit}`} />
  </div>
  )

}

export default Card;