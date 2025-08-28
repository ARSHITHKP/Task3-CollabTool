const socket = io();
const editor = document.getElementById('editor');
const userCount = document.getElementById('userCount');

// Load initial document content
socket.on('document-load', (content) => {
    editor.value = content;
});

// Receive real-time updates from other users
socket.on('text-update', (content) => {
    editor.value = content;
});

// Send text changes to server
editor.addEventListener('input', () => {
    socket.emit('text-change', editor.value);
});

// Update user count (basic example)
socket.on('user-count', (count) => {
    userCount.textContent = count;
});
