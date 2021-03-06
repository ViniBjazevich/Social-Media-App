import React, { useState, useEffect } from 'react'
import axios from 'axios'

import MessagesList from './Messages/MessagesList'
import './Chatroom.css'



export default function Chatroom({ room }) {
  const [messages, setMessages] = useState([])

  function getAllMessagesForChatroom() {
    axios.get(`http://localhost:3001/messages/${room.id}`)
      .then(response => setMessages(response.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    getAllMessagesForChatroom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="chatroom">
      <div className="roomname">{room.roomname}</div>
      <MessagesList messages={messages}/>
    </div>
  )
}
