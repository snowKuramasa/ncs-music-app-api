import express from 'express'
import cors from 'cors' // CORSパッケージのインポート
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(cors()) // CORSを有効にする
app.use(
  cors({
    origin: ['https://ncs-music-app-api.vercel.app'],
  })
)

app.use(express.json())

// CRUDエンドポイントの定義
app.post('/users', async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({
    data: { name, email },
  })
  res.json(user)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  })
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  })
  res.json(user)
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: { id: Number(id) },
  })
  res.json(user)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
