import React from 'react'
import './UserList.css'

export default function User({ user }) {
  return (
    <div>
      {user?.username}
    </div>
  )
}
