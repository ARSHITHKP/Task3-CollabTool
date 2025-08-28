const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from 'public' folder
app.use(express.static('public'));

// Store document content
let documentContent = '';

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);
    
    // Send current document to new user
    socket.emit('document-load', documentContent);
    
    // Handle text changes from clients
    socket.on('text-change', (newText) => {
        documentContent = newText;
        // Broadcast to all other users
        socket.broadcast.emit('text-update', documentContent);
    });
    
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Collaboration server running on http://localhost:${PORT}');
});
