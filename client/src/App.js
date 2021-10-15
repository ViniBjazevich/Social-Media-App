import React, { useEffect, useState } from 'react'
import firebase from './Firebase' // eslint-disable-line
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import axios from 'axios'
import './App.css'

import UserList from './components/User/UserList'
import ChatroomList from './components/Chatroom/ChatroomList'
import NewUserForm from './components/LoginStatus/NewUserForm'
import SignInForm from './components/LoginStatus/SignInForm'
// import LoginWithGoogleButton from './components/LoginStatus/LoginWithGoogleButton';
import LogoutButton from './components/LoginStatus/LogoutButton';
import Test from './components/Test';
import Login from './components/LoginStatus/Login';
import CreatePostForm from './components/Post/CreatePostForm';
import PostList from './components/Post/PostList';

export const UserContext = React.createContext()

export default function App() {
  const [users, setUsers] = useState([])
  const [chatrooms, setChatrooms] = useState([])
  const [user, setUser] = useState({})


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

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(`${uid} is signed in`)
        setUser(user)
      } else {
        console.log('User is signed out.')
        setUser({})
      }
    })
  }, [])


  return (
    <>
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Test/>
              <Login getAllUsers={getAllUsers}/>
              {user?.uid ? <LogoutButton /> : null}
            </Route>
            <Route path="/post">
              <PostList />
            </Route>
            <Route path="/chatrooms">
              <ChatroomList chatrooms={chatrooms}/>
            </Route>
            <Route path="/users">
              <UserList users={users}/>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  )
}
