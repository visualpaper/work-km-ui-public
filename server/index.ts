import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import { users } from './data/users'

const BASE_URL = '/km-server' + '/v1'

const app = express()
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  }),
)

// 共有用の切り替え用フラグ
let toggle = false

// users
app.get(BASE_URL + '/users', (req: any, res: any) => {
  res.setHeader('Content-Type', 'application/json')
  toggle = !toggle

  if (toggle) {
    res.status(200)
    setTimeout(() => {
      res.json(users())
    }, 1000)
  } else {
    res.status(500)
    setTimeout(() => {
      res.json({
        code: 'BASE-0000',
        message: 'bbb',
      })
    }, 1000)
  }
})

app.put(BASE_URL + '/users/:id', (req: any, res: any) => {
  //const user = users().users.find(v => v.id == req.params.id)

  res.status(204)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.send()
  }, 1000)
})

app.post(BASE_URL + '/users', (req: any, res: any) => {
  res.status(204)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.send()
  }, 1000)
})

app.delete(BASE_URL + '/users/:id', (req: any, res: any) => {
  res.status(204)
  res.setHeader('Content-Type', 'application/json')
  setTimeout(() => {
    res.send()
  }, 1000)
})

app.listen(5000)
