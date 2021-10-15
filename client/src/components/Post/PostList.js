import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../../App'
import Post from './Post'
import CreatePostForm from './CreatePostForm'

export default function PostList() {
  const user = useContext(UserContext)

  const [posts, setPosts] = useState([])

  function updatePosts() {
    axios.post(`http://localhost:3001/getPosts`, { author: user.uid })
      .then(response => setPosts(response.data))
      .catch((e) => console.log(e))
  }

  useEffect(() => {
    updatePosts()
  }, [])

  console.log(posts);

  return (
    <div>
      <CreatePostForm updatePosts={updatePosts}/>
      {posts.map((post) => <Post post={post} key={post.id}/>)}
    </div>
  )
}
