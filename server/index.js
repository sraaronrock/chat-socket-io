var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("client"));

var messages = [
  {
    id: 1,
    text: "Welcome to the chat :) ",
    nickname: "Bot",
  },
];

io.on("connection", function (socket) {
  console.log("New user connected: " + socket.handshake.address);

  socket.emit("messages", messages);

  socket.on("add-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

server.listen(6677, function () {
  console.log("Server working at port 6677 ...");
});
