import React from 'react';
import Dice from './Dice';
import Piece from './Piece';

function Board(props){
  return(
    <div>
      <div className="board">
      <Piece color="blue" id='b_1' />
      <Piece color="blue"id='b_2' />
      <Piece color="blue" id='b_3' />
      <Piece color="blue" id='b_4' />
      <Piece color="red" id='r_1' />
      <Piece color="red"id='r_2' />
      <Piece color="red" id='r_3' />
      <Piece color="red" id='r_4' />
      <Piece color="green" id='g_1' />
      <Piece color="green"id='g_2' />
      <Piece color="green" id='g_3' />
      <Piece color="green" id='g_4' />
      <Piece color="yellow" id='y_1' />
      <Piece color="yellow"id='y_2' />
      <Piece color="yellow" id='y_3' />
      <Piece color="yellow" id='y_4' />
      </div>
      <div><Dice /><div id='my_color'>#</div></div>
    </div>
  );
}

export default Board;