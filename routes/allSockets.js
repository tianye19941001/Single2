/*
* @Author: yuanye
* @Date:   2017-12-14 15:02:42
* @Last Modified by:   yuanye
* @Last Modified time: 2017-12-14 15:11:14
*/

const player = { count: 0 };

const allSockets = (io, socket) =>{
  player.count++;
  player.name = 'player' + player.count;
  io.emit('connects', player.name + '加入聊天室～');

  socket.on('message', function (str) {
    io.emit('message', player.name + ':' + str);
  });

  socket.on('disconnect', function(str) {
  	io.emit('disconnect', player.name + '离开了聊天室');
  });

  socket.on('changeName', function(str) {
  	player.name = str;
  	socket.emit('changeName', '名字已经换成：' + str );
  })
}

 module.exports = allSockets;