/*
* @Author: yuanye
* @Date:   2017-12-14 15:02:42
* @Last Modified by:   yuanye
* @Last Modified time: 2018-01-05 15:57:58
*/

const player = { count: 0 };

const allSockets = (io, socket) =>{

  const playerName = socket.handshake.query.player;

  if (playerName && playerName != '' && playerName != 'undefined') {
    socket.nickName = playerName
  } else {
    socket.nickName = 'P' + player.count++;
  }

  io.emit('connects', { name: socket.nickName, type: 'enter'});

  socket.on('message', (str) => {
    io.emit('message', { name: socket.nickName, word: str, id: socket.id });
  });

  socket.on('disconnect', (str) => {
  	io.emit('disconnect', { name: socket.nickName, type: 'leave'});
  });
}

 module.exports = allSockets;