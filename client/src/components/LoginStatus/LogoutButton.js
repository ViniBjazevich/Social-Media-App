import React from 'react'
import { getAuth, signOut } from "firebase/auth";

export default function LogoutButton() {

  function handleSignOut() {
    const auth = getAuth()
    signOut(auth).then(() => {
      console.log('User is now signed out')
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <button onClick={handleSignOut}>Sign Out</button>
  )
}
