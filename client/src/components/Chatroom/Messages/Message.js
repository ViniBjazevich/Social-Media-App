import React from 'react'
import './Message.css'

export default function Message({ message }) {
  return (
    <div className="message">
      <h4>{message.sender}</h4>
      <div>{message.body}</div>
    </div>
  )
}
