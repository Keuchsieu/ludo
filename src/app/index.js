import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board';
import './styles/style.css';

ReactDOM.render(<Board />, document.getElementById('app'));

socket.emit('playerplus', {});

socket.on('join',(player)=>{
  if(socket.id == player['id']){
    MY_COLOR = player['color'];
    NUM_PLAYER = player['num'];
    let myc = document.getElementById('my_color');
    myc.innerHTML = MY_COLOR;
  }
});

socket.on('move', (piece)=>{
  let obj = document.getElementById(piece['id']);
  obj.style.left= piece['left'] + 'px';
  obj.style.top = piece['top'] + 'px';
});

socket.on('next_turn', (data)=>{
  console.log('next turn is '+data['turn']);
  turn = data['turn'];
});

socket.on('playerplus', (data)=>{
  NUM_PLAYER = data['num'];
});

socket.on('roll_dice', (dice)=>{
  let display = document.getElementById("dice_number");
  display.innerHTML = dice['num'];
});

socket.on('win', (winner)=>{
  let msg = "winner is: " + winner['player'];
  alert(msg);
});