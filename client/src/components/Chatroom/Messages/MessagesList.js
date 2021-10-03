import React from 'react'
import Message from './Message'

export default function MessagesList({ messages }) {
  return (
    <div>
      {messages.map((message) => <Message message={message} key={message.id}/>)}
    </div>
  )
}
