import { useState, useEffect } from "react";
import { io } from "socket.io-client"

const socket = io('http://localhost:3000');

export default function LiveChat() {
    return (
        <div className="chat-room">
        </div>
    );
}