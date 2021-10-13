import React, { useEffect, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function SignInForm({ setAlreadyHaveAccount }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(`Success! User ${user} signed in.`)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <>
      <div>Sign In:</div>
      <form onSubmit={handleSubmit}>
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
      <button onClick={() => setAlreadyHaveAccount((prev) => !prev)}>Need to create an account?</button>
      <div style={{border: 'solid 1px black', background: 'lightblue', width: 'fit-content', padding: '5px'}}>
        <h3>Test Account</h3>
        <div>Username: a@gmail.com</div>
        <div>Password: 123123</div>
      </div>
    </>
  );
}
