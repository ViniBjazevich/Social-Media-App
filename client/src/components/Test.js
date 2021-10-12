import React,  { useContext } from 'react'
import { UserContext } from '../App'


export default function Test() {
  const user = useContext(UserContext)
  return (
    <h1>
      {user?.uid ? user.uid : 'User is not signed in'}
    </h1>
  )
}
