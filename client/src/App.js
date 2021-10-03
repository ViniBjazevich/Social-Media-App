import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import UserList from './components/User/UserList'
import ChatroomList from './components/Chatroom/ChatroomList'

export default function App() {
  const [users, setUsers] = useState([])
  const [chatrooms, setChatrooms] = useState([])

  function getAllUsers() {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch((e) => console.log(e))
  }

  function getAllChatrooms() {
    axios.get('http://localhost:3001/chatrooms')
      .then(response => setChatrooms(response.data))
      .catch((e) => console.log(e))
  }

    useEffect(() => {
    getAllUsers()
    getAllChatrooms()
  }, [])

  return (
    <div>
      <UserList users={users}/>
      <ChatroomList chatrooms={chatrooms}/>
    </div>
  )
}
