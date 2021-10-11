import React from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function LoginWithGoogleButton() {
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
  return (
    <button onClick={handleGoogleSignIn}>Sign In with Google</button>
  )
}
