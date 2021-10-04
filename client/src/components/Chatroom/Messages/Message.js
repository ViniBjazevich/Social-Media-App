import React from 'react'
import './Message.css'

export default function Message({ message }) {
  return (
    <div className="message">
      <div className="sender">{message.sender}</div>
      <div>{message.body}</div>
    </div>
  )
}
