/*
* @Author: yuanye
* @Date:   2017-12-14 15:02:42
* @Last Modified by:   yuanye
* @Last Modified time: 2017-12-18 16:10:23
*/

const player = { count: 0 };

const allSockets = (io, socket) =>{
  player.count++;
  player.name = 'P' + player.count;
  
  io.emit('connects', { name: player.name, type: 'enter'});

  socket.on('message', function (str) {
    io.emit('message', { name: player.name, word: str, id: socket.id });
  });

  socket.on('disconnect', function(str) {
  	io.emit('disconnect', { name: player.name, type: 'leave'});
  });

  socket.on('changeName', function(str) {
  	player.name = str;
  	socket.emit('changeName', '名字已经换成：' + str );
  })
}

 module.exports = allSockets;