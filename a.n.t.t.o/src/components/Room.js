'use client'

import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

class Room extends Component {
    state = {
        filledForm: false,
        messages: [],
        value: '',
        name: '',
        room: 'the',
    };
    
    client = new W3CWebSocket('ws://localhost:8000/ws/port/' + this.state.room + '/');

    componentDidMount() {
        this.client.onopen = () => {
            console.log("WebSocket Client Connected");
        };
        this.client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            if (dataFromServer) {
                this.setState((state) => ({
                    messages: [
                        ...state.messages,
                        {
                            msg: dataFromServer.message,
                        },
                    ],
                }), () => {
                    console.log('Received Message: ', dataFromServer.message);
                });
            }
        };
    }

    render() {
        return (
            <div>
                {/* Room Name: {this.state.room} */}
                <div className='w-full h-fit'>
                {this.state.messages.length > 0 ? (
                    this.state.messages.map((message, index) => (
                        <div className='my-2' key={index}>
                            <p>{message.msg}</p>
                        </div>
                    ))
                ) : (
                    <div>No messages.</div>
                )}
                {/* {this.state.messages.map((message, index) => (
                    <div key={index}>
                        <p>{message.msg}</p>
                    </div>
                ))} */}
                </div>
            </div>
        );
    }
}

export default Room;
