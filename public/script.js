let socket=io();
let sID=socket.id;
socket.emit("added"," ");
let container=document.getElementsByClassName('message')[0];
function createTime(){
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let timeString = hours + ':' + minutes + ' ' + ampm;
    return timeString;
}

document.getElementById("data").addEventListener("keyup",function(e){
    let data=document.getElementById('data').value;
    if(e.key!='Enter'&&data.length>0){
        socket.emit('received-message',"hello");
    }
    else if(data.length==0&&e.key!='Enter'){
        socket.emit('update-typing',"world");
    }
})
document.querySelector('form').addEventListener("submit",function(e){
    e.preventDefault();
    let data=document.getElementById('data').value;
    if(data.length>0){
        socket.emit("send-message",data)
        let div=document.createElement('div');
        let span=document.createElement('span');
        span.innerHTML = username;
        span.classList.add('span')
        div.classList.add('sender');
        let p=document.createElement('p');
        p.innerHTML=data;
        p.classList.add('para')
        div.appendChild(span);
        div.appendChild(p)
        let time=document.createElement('div');
        time.innerHTML=createTime();
        time.classList.add('time');
        div.appendChild(time);
        container.appendChild(div);
        container.scrollTop=container.scrollHeight;
    }
    this.reset();
})
let prevId=null;
let child=-1;
socket.on('received-message',function(chat,id,arr){
    if(chat.length>0&&socket.id!=id){
        ChatActivity(chat,id,arr);
        prevId=null;
    }
    if(chat.length==0&&socket.id!=id&&prevId!=id){
        ChatActivity("Typing...",id,arr)
        prevId=id;
    }
});

socket.on("update-typing",function(id,arr){
    let name="";
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            name=arr[i].username;
            break;
        }
    }
    for(let i=container.children.length-1;i>=0;i--){
        if(container.children[i].classList.contains('recieved')&&container.children[i].children[0].innerHTML==name){
            if(container.children[i].children[1].innerHTML=="Typing..."){
                container.removeChild(container.children[i]);
                prevId=null;
                break;
            }
        }
    }
})
socket.on("added",function(arr){
    let name=arr[arr.length-1].username;
    let id=arr[arr.length-1].id;
    let div=document.createElement("div");
    div.classList.add('newjoin');
    if(name.length==0&&id==socket.id)
        return window.location.href="/";
    if(id!=socket.id&&name.length>0){
        div.innerHTML=name+" joined the chit chat "+ createTime();
        container.appendChild(div);
    }
    if(id==socket.id&&name.length>0){
        div.innerHTML="You joined the chit chat "+ createTime();
        container.appendChild(div);
    }
    container.scrollTop=container.scrollHeight;
})
socket.on("dis-connect", function(id,arr){
    let name="";
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            name=arr[i].username;
            break;
        }
    }
    for(let i=container.children.length-1;i>=0;i--){
        if(container.children[i].classList.contains('recieved')&&container.children[i].children[0].innerHTML==name){
            if(container.children[i].children[1].innerHTML=="Typing..."){
                container.removeChild(container.children[i]);
                break;
            }
        }
    }
    let div=document.createElement("div");
    if(name.length>0){
        div.innerHTML=name+" left the chit chat "+ createTime();
        div.classList.add('newjoin');
        container.appendChild(div);
    }
    container.scrollTop=container.scrollHeight;
})

function ChatActivity(chat,id,arr){
    let div=document.createElement('div');
    let name="";
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==id){
            name=arr[i].username;
            break;
        }
    }
    for(let i=container.children.length-1;i>=0;i--){
        if(container.children[i].classList.contains('recieved')&&container.children[i].children[0].innerHTML==name){
            if(container.children[i].children[1].innerHTML=="Typing..."){
                container.removeChild(container.children[i]);
                break;
            }
        }
    }
    let span=document.createElement('span');
    span.innerHTML = name;
    span.classList.add('span2')
    div.classList.add('recieved')
    let p=document.createElement('p');
    p.innerHTML=chat;
    p.classList.add('para')
    div.appendChild(span);
    div.appendChild(p)
    let time=document.createElement('div');
    time.innerHTML=createTime();
    time.classList.add('time');
    div.appendChild(time);
    container.appendChild(div);
    container.scrollTop=container.scrollHeight;
}