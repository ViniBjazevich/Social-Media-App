import React, { useState } from 'react'
import NewUserForm from './NewUserForm'
import SignInForm from './SignInForm'


export default function Login({ getAllUsers }) {
  const [alreadyHaveAccount, setAlreadyHaveAccount] = useState(true)

  return (
    <>
      {alreadyHaveAccount ? <SignInForm setAlreadyHaveAccount={setAlreadyHaveAccount}/> : <NewUserForm setAlreadyHaveAccount={setAlreadyHaveAccount} getAllUsers={getAllUsers}/>}
    </>
  )
}
