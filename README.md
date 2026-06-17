# CHAT_APP

A real-time chat application built using Node.js, Express, and Socket.IO. This project enables multiple users to connect and exchange messages instantly through a simple and responsive web interface.

## Features

* Real-time messaging using Socket.IO
* Multiple users can join and chat simultaneously
* Lightweight and responsive user interface
* Instant message broadcasting
* Built with a simple client-server architecture

## Tech Stack

### Backend

* Node.js
* Express.js
* Socket.IO

### Frontend

* HTML
* CSS
* JavaScript

## Project Structure

```text
CHAT_APP/
├── public/
│   ├── index.html
│   ├── main.js
│   ├── style.css
│   └── universfield-new-notification-022-370046.mp3
├── app.js
├── package.json
├── package-lock.json
└── .gitignore
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/anonymous2264/CHAT_APP.git
```

2. Navigate to the project directory:

```bash
cd CHAT_APP
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
node app.js
```

5. Open your browser and visit:

```text
http://localhost:4000
```

## How It Works

* The Express server serves the frontend files.
* Socket.IO establishes a real-time connection between the client and server.
* When a user sends a message, it is broadcast to all connected users instantly.
* Notification sounds enhance the chat experience.

## Learning Outcomes

This project helped in understanding:

* WebSockets and real-time communication
* Event-driven programming
* Client-server architecture
* Socket.IO fundamentals
* Building interactive web applications

## Future Improvements

* User authentication
* Private messaging
* Chat rooms
* Message persistence using a database
* Typing indicators
* Online user list

## Author

ANONYMOUS

---

If you find this project useful, feel free to star the repository.
