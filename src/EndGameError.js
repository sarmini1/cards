import React from 'react';

/** EndGameError
 * 
 * Props: none
 * State: none
 * 
 * App --> CardGame ---> EndGameError
 */
function EndGameError(){

  return (<div>
    <h1>Error: No cards remaining!</h1>
  </div>)
}

export default EndGameError;