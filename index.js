var express = require('express');
var app = express();
var swig = require('swig');
const bodyParser = require('body-parser')

//  引入socket.io  并和express搭配使用
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(bodyParser.json())
app.set('views',__dirname+'/views');
// 设置静态资源目录
app.use("/public",express.static(__dirname+'/public'))

swig.setDefaults({
  cache:false
});

app.engine('html', swig.renderFile);
app.set('view engine','html')

//添加连接监听
io.on('connection', (socket) => {
  console.log('socket已经连接');
//   监听对应的事件
  socket.on('chat message', function(msg){
    io.emit('chat messages', msg);
  });
})

// router
app.get('/chat', (req, res) => {
    res.render('chat/index');
})

app.get('/', function (req, res) {
    res.render('chat/index');
})

server.listen(8082,()=>{
    console.log('链接成功')
})