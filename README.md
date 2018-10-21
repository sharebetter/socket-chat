# socket-chat
### socket.io实现简单的双向通信聊天功能

![weChat](https://github.com/sharebetter/socket-chat/blob/master/itemImg/websocket.gif)

### npm install 安装依赖
### node index.js 运行

##### 服务端： Express框架, node.js , socket.io
##### 客户端： 网页, socket.io

```
  要将事件发送给每个用户，Socket.IO 提供了 io.emit 方法：io.emit('some event', { for: 'everyone' });
  通过 io.on('some event',()=>{}) 监听消息
```

### 主要代码
#### 客户端
 ```javascript
        $('form').submit(function(){
          // console.log($('#m').val())
          flag = true; //发送还是接收flag
          socket.emit('chat message', $('#msg').val());
          $('#msg').val('');
          return false;
      });
      socket.on('chat messages', function(socketMsg){
          let sendMsg = sendMessage.replace('{content}',socketMsg);
          let receiveMsg = receiveMessage.replace('{content}',socketMsg);
          let msg = flag?sendMsg:receiveMsg;
          $('#messages').append(msg);
          flag = false;
      });
 ```
#### 服务端
``` javascript
  //  引入socket.io  并和express搭配使用
  const server = require('http').Server(app)
  const io = require('socket.io')(server)
  //添加连接监听
  io.on('connection', (socket) => {
    console.log('socket已经连接');
  //   监听对应的事件
    socket.on('chat message', function(msg){
      io.emit('chat messages', msg);
    });
  })
```
