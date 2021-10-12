import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from 'axios'

export default function NewUserForm({ getAllUsers }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const id = user.uid;
        console.log(`Success! User ${user.uid} was created.`)
        axios.post(`http://localhost:3001/user`, {id, username: `@${username}`, email})
          .then(() => {
            console.log(`${username} was created!`)
            getAllUsers()
          })
          .catch(error => console.log(error))
          })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <>
      <div>Sign Up:</div>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          type="username"
          name="username"
          required
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          name="email"
          required
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
