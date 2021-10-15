import React, { useState, useContext } from 'react'
import { UserContext } from '../../App'
import axios from 'axios'

export default function CreatePostForm({ updatePosts }) {
  const user = useContext(UserContext)

  const [body, setBody] = useState("");

// CREATE TABLE post (
// 	id serial PRIMARY KEY,
// 	author VARCHAR ( 255 ) references users(id),
// 	body VARCHAR ( 300 ) NOT NULL,
// 	like_count int DEFAULT 0
// );

// INSERT INTO post (author, body)
// 	VALUES ('123', 'This is my first post!!!');
  function handleSubmit(e) {
    e.preventDefault()

    axios.post(`http://localhost:3001/post`, { userID: user.uid, body })
      .then(response => {
        console.log(response.data)
        setBody("")
        updatePosts()
        })
      .catch((e) => console.log(e))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{user.uid}</div>
      <input
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Whats on your mind?"
        type="text"
        name="body"
        required
      />
      <button type="submit">Submit</button>
    </form>
  )
}
