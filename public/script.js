let socket=io();
let container=document.getElementsByClassName('message')[0];
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
    container.appendChild(div);
    container.scrollTop=container.scrollHeight;
}