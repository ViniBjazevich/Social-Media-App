import React from 'react'
import User from './User'
import './User.css'

export default function UserList({ users }) {
  return (
    <div className="userList">
      <div className="userListTitle">User List:</div>
      {users.map((user) => <User user={user} key={user.id}/>)}
    </div>
  )
}
