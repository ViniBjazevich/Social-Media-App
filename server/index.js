const express = require('express')
const db = require('../database/index')
const app = express()
const cors = require('cors')
const port = 3001

app.use(cors())
app.use(express.json())


app.get('/users', (req, res) => {
  db
    .query("SELECT * FROM users")
    .then(response => res.send(response.rows))
    .catch(e => console.error(e.stack))
})

app.get('/chatrooms', (req, res) => {
  db
    .query("SELECT * FROM chatroom")
    .then(response => res.send(response.rows))
    .catch(e => console.error(e.stack))
})


app.get('/messages/:room_id', (req, res) => {
  let { room_id } = req.params;

  db
    .query(`SELECT users.username AS sender, messages.body, chatroom.roomname, messages.id FROM messages
              JOIN chatroom ON chatroom.id = chatroom_id
              JOIN users ON users.id = user_id
              WHERE chatroom.id = ${room_id};`)
    .then(response => res.status(200).send(response.rows))
    .catch(e => console.log(e))
})


app.post('/user', (req, res) => {
  let { id, username, email } = req.body;
  db
    .query(`INSERT INTO users (id, username, email, created_on)
          VALUES  ('${id}', '${username}', '${email}', current_timestamp);`)
    .then(response => res.status(200).send(response.rows))
    .catch(e => console.log(e))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})