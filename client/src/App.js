import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import UserList from './components/UserList/UserList'

export default function App() {
  const [users, setUsers] = useState([])

  function getAllUsers() {
    axios.get('http://localhost:3001/users')
      .then(response => setUsers(response.data))
      .catch((e) => console.log(e))
  }

    useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <UserList users={users}/>
    </div>
  )
}
