let express=require('express');
let app=express();
let path=require('path');
let http=require('http');
let server=http.createServer(app);
let io=require('socket.io')(server);


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

io.on('connect',function(User){
    let id=User.id;
    console.log("User connected",User.id);
    User.on("send-message",function(chat){
        io.emit('received-message',chat,id);
    })
    User.on("received-message",function(data){
        let chat="";
        io.emit('received-message',chat,id);
    })
    User.on('update-typing',function(data){
        io.emit('update-typing',id);
    })
})


server.listen(3000,function(){
    console.log("Server is running on port 3000");
})

app.get("/",function(req,res){
    res.render("chat.ejs");
})
