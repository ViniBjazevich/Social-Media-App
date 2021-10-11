import React, { useEffect, useState } from 'react'
import firebase from './Firebase' // eslint-disable-line
import { getAuth, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom" // eslint-disable-line
import axios from 'axios'
import './App.css'

import UserList from './components/User/UserList'
import ChatroomList from './components/Chatroom/ChatroomList'
import CreateNewUserForm from './components/SignIn/NewUser'
import SignInForm from './components/SignIn/SignInForm';


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

  function handleGoogleSignIn() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Google sign in worked!')
      }).catch((error) => {
        console.log(error)
      });
  }

  function handleSignOut() {
    const auth = getAuth()
    signOut(auth).then(() => {
      console.log('User is now signed out')
    }).catch((error) => {
      console.log(error)
    });
  }

  useEffect(() => {
    getAllUsers()
    getAllChatrooms()

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(`${uid} is signed in`)
      } else {
        console.log('User is signed out.')
      }
    })
  }, [])

  return (
    <div>
      <div>Sign Up</div>
      <CreateNewUserForm />
      <div>Sign In</div>
      <SignInForm />
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>
      <button onClick={handleSignOut}>Sign Out</button>
      <h3>Test Account</h3>
      <div>Username: a@gmail.com</div>
      <div>Password: 123123</div>
      <UserList users={users}/>
      <ChatroomList chatrooms={chatrooms}/>
    </div>
  )
}
