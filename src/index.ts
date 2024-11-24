import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get('/hello', async (req, res) => {
  res.json({ Hello: 'World' })
})

// Create
app.post('/users', async (req, res) => {
  const { name, email } = req.body
  const user = await prisma.user.create({
    data: { name, email },
  })
  res.json(user)
})

// Read
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

// Update
app.put('/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email } = req.body
  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  })
  res.json(user)
})

// Delete
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
