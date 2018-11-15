var express = require('express');
var path = require('path')
// backend node js script
var socket = require('socket.io');
const port = 8000;
// 
var app = express();
// middleware that put public folder's content onto server
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/public/index.html");
});

var server = app.listen(port, ()=>{
    console.log("Listening on port " + port);
});

var io = socket(server);
var player_num = 0;
var player_list = {
    blue: 0,
    red: 0,
    green: 0,
    yellow: 0,
};

io.on('connection', (socket)=>{
    if(player_list['blue'] == 0){
        player_num++;
        player_list['blue'] = socket.id;
        socket.emit('join', {
            id: socket.id,
            color: 'blue',
            num: player_num
        });
        console.log("player "+socket.id+" joined as blue!");
    } else if (player_list['red'] == 0){
        player_num++;
        player_list['red'] = socket.id;
        socket.emit('join', {
            id: socket.id,
            color: 'red',
            num: player_num
        });
        console.log("player "+socket.id+" joined as red!");
    } else if (player_list['green'] == 0){
        player_num++;
        player_list['green'] = socket.id;
        socket.emit('join', {
            id: socket.id,
            color: 'green',
            num: player_num
        });
        console.log("player "+socket.id+" joined as green!");
    } else if (player_list['yellow'] == 0){
        player_num++;
        player_list['yellow'] = socket.id;
        socket.emit('join', {
            id: socket.id,
            color: 'yellow',
            num: player_num
        });
        console.log("player "+socket.id+" joined as yellow!");
    } else {
        console.log("audience "+socket.id+" entered room")
    }
 
    // broadcast dice value
    socket.on('roll_dice', (data)=>{
        socket.broadcast.emit('roll_dice', data);
    });

    // broad cast when other player joins
    socket.on('playerplus', ()=>{
        socket.broadcast.emit('playerplus', {num: player_num});
    })

    // broad cast when a player makes a move
    socket.on('move', (piece)=>{
        socket.broadcast.emit('move', piece);
    })
    
    socket.on('win', (player)=>{
        socket.broadcast.emit('win', player);
    })

    socket.on('next_turn', (data)=>{
        console.log('next turn will be ' + data['turn']);
        socket.broadcast.emit('next_turn', data);
    })

    // player quits
    socket.on('disconnect', ()=>{
        for(let player in player_list){
            if (player_list[player] == socket.id){
                player_list[player] = 0;
                player_num--;
            }
        }
        console.log("user "+socket.id+" left");
    });
});