const socket = io();

function sendMessage() {
    const message = document.getElementById('messageInput').value;
    if (message.trim() !== '') {
        socket.emit('newMessage', message);
        document.getElementById('messageInput').value = ''; // limpiar input
    }
}

function appendMessage(socketId, message) {
    const messageList = document.getElementById('messageList');
    const newMessage = document.createElement('p');
    newMessage.textContent = `${socketId}: ${message}`;
    messageList.appendChild(newMessage);
}

socket.on('messageList', (messages) => {
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = "";
    messages.forEach((msg) => {
        appendMessage(msg.socketId, msg.message);
    });
});

socket.on('newMessage', (data) => {
    appendMessage(data.socketId, data.message);
});
