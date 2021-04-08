import { PrismaClient } from "@prisma/client";
import * as bodyParser from "body-parser";
import express from "express";

export const prisma = new PrismaClient();
export const app = express();

app.use(bodyParser.json());

app.get(`/todos`, async (req, res) => {
  const result = await prisma.todo.findMany();
  res.json(result);
});

app.get(`/todos/:id`, async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(todo);
});

app.post(`/todos`, async (req, res) => {
  const result = await prisma.todo.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.todo.update({
    where: { id: Number(id) },
    ...req.body,
  });
  res.json(post);
});

app.delete(`/todos/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.todo.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(post);
});
