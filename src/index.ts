import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
})

app.get(`/users`, async (req, res) => {
  const result = await prisma.user.findMany()
  res.json(result)
})

app.post(`/post`, async (req, res) => {
  const { title, author } = req.body
  const result = await prisma.post.create({
    data: {
      title,
      published: false,
      author
    },
  })
  res.json(result)
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { published: true },
  })
  res.json(post)
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findOne({
    where: {
      id: Number(id),
    },
  })
  res.json(post)
})

app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true }
  })
  res.json(posts)
})

app.get('/filterPosts', async (req, res) => {
  const { searchString }: { searchString?: string } = req.query;
  const draftPosts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
      ],
    },
  })
  res.json(draftPosts)
})

const server = app.listen(3000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
  ),
)