var express = require('express');
var app = express();
var server = app.listen(3333);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    var id = socket.id;

    socket.on('mousemove', function (data) {
        data.id = id;
        io.emit('moving',data)
    })

    socket.on('disconnect', function () {
        io.emit('disconnect',id)
    })
})