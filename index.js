let express=require('express');
let app=express();
let path=require('path');
let http=require('http');
let server=http.createServer(app);
let io=require('socket.io')(server);
let UserData="";
let arr=[];
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

io.on('connect',function(User){
    let id=User.id;
    let Detail={
        "id":id,
        "username":UserData
    }
    UserData="";
    arr.push(Detail);
    User.on("send-message",function(chat){
        io.emit('received-message',chat,id,arr);
    })
    User.on("received-message",function(data){
        let chat="";
        io.emit('received-message',chat,id,arr);
    })
    User.on('update-typing',function(data){
        io.emit('update-typing',id,arr);
    })
})


server.listen(3000,function(){
    console.log("Server is running on port 3000");
})

app.get("/",function(req,res){
    res.render("home.ejs");
})
app.get("/chat",function(req,res){
    res.render("chat.ejs",{username:UserData});
})
app.post("/user_details",function(req,res){
    let {username,password}=req.body;
    UserData=username;
    res.redirect("/chat");
})
