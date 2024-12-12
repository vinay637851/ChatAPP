let socket=io();
let container=document.getElementsByClassName('message')[0];
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
socket.on('received-message',function(chat,id){
    let div=document.createElement('div');
    if(chat.length>0&&socket.id!=id){
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
});