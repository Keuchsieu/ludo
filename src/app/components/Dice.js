import React from 'react';

function is_my_turn(){
  if(MY_COLOR == 'blue' && turn == 0){
    return true;
  }
  if(MY_COLOR == 'red' && turn == 1){
    return true;
  }
  if(MY_COLOR == 'green' && turn == 2){
    return true;
  }
  if(MY_COLOR == 'yellow' && turn == 3){
    return true;
  }
  return false;
}

function rolling(){
  if (!is_my_turn()){
    console.log('Not my turn!');
  }
  else if(CAN_ROLL_DICE){
    let result = Math.floor(Math.random() * 6 + 1);
    // let result = 20;
    let display = document.getElementById("dice_number");
    // will set time interval for the following 2 lines?
    display.innerHTML= result;
    dice_value = result;
    socket.emit('roll_dice', {num: dice_value});
    CAN_ROLL_DICE = false;
    CAN_MOVE = true;
    console.log(turn);
  }
  else {
    console.log("already rolled this turn!");
  }
};

function Dice(props){
  return(
    <div className="dice">
     <button onClick={rolling}>Roll the dice</button>
     <p id="dice_number">#</p>
    </div>
  );
}

export default Dice;