//websocket gateway on 8070
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
app.listen(8070);
var mysocket = 0;
function handler(req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}
io.sockets.on('connection', function (socket) {
    console.log('index.html connected');
    mysocket = socket;
});

io.sockets.on('Start', function (data) { //data contains the variables that we passed through in the html file
    console.log('Start = ', data);

    //var Name = data['Name'];
    //Files[Name] = {  //Create a new Entry in The Files Variable
    //    FileSize: data['Size'],
    //    Data: "",
    //    Downloaded: 0
    //}
    //var Place = 0;
    //try {
    //    var Stat = fs.statSync('Temp/' + Name);
    //    if (Stat.isFile()) {
    //        Files[Name]['Downloaded'] = Stat.size;
    //        Place = Stat.size / 524288;
    //    }
    //}
    //catch (er) { } //It's a New File
    //fs.open("Temp/" + Name, "a", 0755, function (err, fd) {
    //    if (err) {
    //        console.log(err);
    //    }
    //    else {
    //        Files[Name]['Handler'] = fd; //We store the file handler so we can write to it later
    //        socket.emit('MoreData', { 'Place': Place, Percent: 0 });
    //    }
    //});
});

io.sockets.on('Upload', function (data) {
    console.log('Upload = ', data);

    //var Name = data['Name'];
    //Files[Name]['Downloaded'] += data['Data'].length;
    //Files[Name]['Data'] += data['Data'];
    //if (Files[Name]['Downloaded'] == Files[Name]['FileSize']) //If File is Fully Uploaded
    //{
    //    fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function (err, Writen) {
    //        //Get Thumbnail Here
    //    });
    //}
    //else if (Files[Name]['Data'].length > 10485760) { //If the Data Buffer reaches 10MB
    //    fs.write(Files[Name]['Handler'], Files[Name]['Data'], null, 'Binary', function (err, Writen) {
    //        Files[Name]['Data'] = ""; //Reset The Buffer
    //        var Place = Files[Name]['Downloaded'] / 524288;
    //        var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
    //        socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
    //    });
    //}
    //else {
    //    var Place = Files[Name]['Downloaded'] / 524288;
    //    var Percent = (Files[Name]['Downloaded'] / Files[Name]['FileSize']) * 100;
    //    socket.emit('MoreData', { 'Place': Place, 'Percent': Percent });
    //}
});

//udp server on 41181
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
    console.log("msg: " + msg);
    if (mysocket != 0) {
        mysocket.emit('field', "" + msg);
    }
});
server.on("listening", function () {
    var address = server.address();
    console.log("udp server listening " + address.address + ":" + address.port);
});
server.bind(41181);