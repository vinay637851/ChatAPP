let socket=io();
let container=document.getElementsByClassName('message')[0];
document.getElementById("data").addEventListener("keyup",function(e){
    let data=document.getElementById('data').value;
    if(e.key!='Enter'&&data.length>0){
        socket.emit('received-message',"hello");
    }
    if(data.length==0&&e.key!='Enter'){
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
        span.innerHTML = socket.id;
        span.classList.add('span')
        div.classList.add('sender');
        let p=document.createElement('p');
        p.innerHTML=data;
        p.classList.add('para')
        div.appendChild(span);
        div.appendChild(p)
        container.appendChild(div);
        container.scrollTop=container.scrollHeight;
    }
    this.reset();
})
let prevId=null;
let child=-1;
socket.on('received-message',function(chat,id){
    if(chat.length>0&&socket.id!=id){
        ChatActivity(chat,id);
        prevId=null;
    }
    if(chat.length==0&&socket.id!=id&&prevId!=id){
        ChatActivity("Typing...",id)
        prevId=id;
    }
});

socket.on("update-typing",function(id){
    for(let i=container.children.length-1;i>=0;i--){
        if(container.children[i].classList.contains('recieved')&&container.children[i].children[0].innerHTML==id){
            if(container.children[i].children[1].innerHTML=="Typing..."){
                container.removeChild(container.children[i]);
                prevId=null;
                break;
            }
        }
    }
})

function ChatActivity(chat,id){
    let div=document.createElement('div');
    for(let i=container.children.length-1;i>=0;i--){
        if(container.children[i].classList.contains('recieved')&&container.children[i].children[0].innerHTML==id){
            if(container.children[i].children[1].innerHTML=="Typing..."){
                container.removeChild(container.children[i]);
                break;
            }
        }
    }
    let span=document.createElement('span');
    span.innerHTML = id;
    span.classList.add('span2')
    div.classList.add('recieved')
    let p=document.createElement('p');
    p.innerHTML=chat;
    p.classList.add('para')
    div.appendChild(span);
    div.appendChild(p)
    container.appendChild(div);
    container.scrollTop=container.scrollHeight;
}