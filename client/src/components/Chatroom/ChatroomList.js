import React from 'react'
import Chatroom from './Chatroom'

export default function ChatroomList({ chatrooms }) {
  return (
    <div>
      {chatrooms.map((room) => <Chatroom room={room} key={room.id}/>)}
    </div>
  )
}
