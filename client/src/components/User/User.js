import React from 'react'
import './User.css'

export default function User({ user }) {
  return (
    <div className="user">
      <div>{user?.username}</div>
    </div>
  )
}
