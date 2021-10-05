const express = require('express')
const db = require('../database/index')
const app = express()
const cors = require('cors')
const port = 3001

//oath
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

// Add cors for specific urls: (client, okta)
app.use(cors())
app.use(express.json())

// session support is required to use ExpressOIDC
// app.use(session({
//   secret: 'this should be secure',
//   resave: true,
//   saveUninitialized: false
// }));

//   const oidc = new ExpressOIDC({
//     appBaseUrl: 'http://localhost:3000',
//     issuer: 'https://dev-42172017.okta.com/oauth2/auss5kkzkkzYune155e6',
//     client_id: '0oa23m9fjagw18I3S5d7',
//     client_secret: '_vbUpP8sEK8hDmYg5Dc-TNxpUcEBuHVkmsLwMoLB',
//     redirect_uri: 'http://localhost:3000/authorization-code/callback',
//     scope: 'openid profile'
//   })

// If the user isn't authenticated, they are redirected to the sign-in page
// app.all('*', oidc.ensureAuthenticated());

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
// app.use(oidc.router)


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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})