import React from 'react';
import '../styles/blue.css';
import '../styles/green.css';
import '../styles/yellow.css';
import '../styles/red.css';

const win_point = {top: '285px', left: '280px'};
const blue_start = {top: 235, left: 30};
const blue_final = {top: 285, left: 30};
const red_start = {top: 35, left: 330};
const red_final = {top: 35, left: 280};
const green_start = {top: 335, left: 530};
const green_final = {top: 285, left: 530};
const yellow_start = {top: 535, left: 230};
const yellow_final = {top: 535, left: 280};

const x_1 = 30;
const x_2 = 230;
const x_3 = 330;
const x_4 = 530;

const y_1 = 35;
const y_2 = 235;
const y_3 = 335;
const y_4 = 535;

function Piece(props){
  function is_my_piece(color){
    return color == MY_COLOR;
  };

  function this_location(id, pos, col){
    let obj = document.getElementById(id);
    // if the object is not moved by using the style change
    if(obj.style.top == '' && obj.style.left ==''){
      return 'home';
    } 
    if (col == 'blue' && pos['left'] < x_3 &&pos['top']==blue_final['top']){
      return 'final';
    } else if (col == 'red' && pos['left'] == red_final['left']&&pos['top']<y_3){
      return 'final';
    } else if (col == 'green' && pos['left'] == green_final['left']&&pos['top']==green_final['top']){
      return 'final';
    } else if (col == 'yellow' && pos['left'] == yellow_final['left']&&pos['top']==yellow_final['top']){
      return 'final';
    }
    return 'on_board';
  }

  function out(id, col){
    if (dice_value != 16){
      let obj = document.getElementById(id);
      if (col == 'blue'){
        obj.style.top = blue_start['top'] + 'px';
        obj.style.left = blue_start['left']+'px';
      } else if (col == 'red'){
        obj.style.top = red_start['top'] + 'px';
        obj.style.left = red_start['left']+'px';
      } else if (col == 'green'){
        obj.style.top = green_start['top'] + 'px';
        obj.style.left = green_start['left']+'px';
      } else if (col == 'yellow'){
        obj.style.top = yellow_start['top'] + 'px';
        obj.style.left = yellow_start['left']+'px';
      }
      socket.emit('move', {
        id: obj.id,
        left: obj.offsetLeft,
        top: obj.offsetTop
      });
    }
  };

  function final_move(id, pos, col, moves){
    let obj = document.getElementById(id);
    let x = pos['left'];
    let y = pos['top'];
    for(let i=0; i<moves;i++){
      if (col == 'blue'){
        x += 50;
        obj.style.left = x + 'px';
        if(obj.style.left == win_point['left']){
          alert("Player Win!");
          socket.emit('win', {player: col});
        }
      } else if (col == 'red'){
        y +=50;
        obj.style.top = y + 'px';
        if(obj.style.left == win_point['top']){
          socket.emit('win', {player: col});
        }
      } else if (col == 'green'){
        x -= 50;
        obj.style.left = x + 'px';
        if(obj.style.left == win_point['left']){
          socket.emit('win', {player: col});
        }
      } else if (col == 'yellow'){
        y -= 50;
        obj.style.top = y + 'px';
        if(obj.style.left == win_point['top']){
          socket.emit('win', {player: col});
        }
      }
    }
    socket.emit('move', {
      id: obj.id,
      left: obj.offsetLeft,
      top: obj.offsetTop
    });
  }

  function board_move(id, pos, col){
    let x = pos['left'];
    let y = pos['top'];
    let obj = document.getElementById(id);
    for(let i=0; i<dice_value;i++){
      if(this_location(id, {top:y,left:x}, col) == 'on_board'){
        if (y==y_1 && (x!=x_3)){
          x+=50;
        } else if(y==y_2 && (x!=x_2&&x!=x_4)){
          x+=50;
        } else if(y==y_3 && (x!=x_1&&x!=x_3)){
          x-=50;
        } else if(y==y_4 && (x!=x_2)){
          x-=50;
        } else if (x==x_1 && (y!=y_2)){
          y-=50;
        } else if (x==x_2 && (y!=y_1&&y!=y_3)){
          y-=50;
        } else if (x==x_3 && (y!=y_2&&y!=y_4)){
          y+=50;
        } else if (x==x_4 && (y!=y_3)){
          y+=50;
        }
        obj.style.left = x+'px';
        obj.style.top = y+'px';
      } else {
        final_move(id,{top: y, left:x},col, dice_value-i);
        break;
      }
      
      console.log(obj.style.left);
      console.log(obj.style.top);
      // if(obj.style.left == win_point['left'] && obj.style.){}
      socket.emit('move', {
        id: obj.id,
        left: obj.offsetLeft,
        top: obj.offsetTop
      });
    }
  };

  function final(col, pos){};

  function action(id, pos, col){
    if (!CAN_MOVE){
      console.log("haven't roll the dice!")
    } else if(is_my_piece(col)){
      // make the actual move
      let cur_loc = this_location(id, pos, col);  
      console.log(col+ ' moving '+cur_loc);
      if (cur_loc == 'home'){
        out(id, col);
      } else {
        board_move(id, pos, col);
      }
      console.log(id+" made one move");
      CAN_MOVE = false;
      if(dice_value == 6){
        CAN_ROLL_DICE = true;
      }
      else { // keep turn if rolled 6
        turn = (turn + 1) % NUM_PLAYER;
        CAN_ROLL_DICE = true;
        socket.emit('next_turn',{
          'turn': turn
        });
      }
    }
  };

  function move_piece(){
    let color = props.color;
    let id = props.id;
    let obj = document.getElementById(id);
    let position = {
      left: obj.offsetLeft,
      top: obj.offsetTop
    }
    action(id, position, color);
  };
  return(<div className={"piece " + props.color} id={props.id} onClick={move_piece}></div>);
};

export default Piece;