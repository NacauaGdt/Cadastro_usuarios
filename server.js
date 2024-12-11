import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/usuarios", async (req, res) => {
  //POST cria usuário

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.send("Ok, aqui deu certo");
});

app.get("/usuarios", async (req, res) => {
  //GET lista os usuários criados

  let users = [];

  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  res.json(users);
});

app.put("/usuarios/:id", async (req, res) => {
  //PUT edita os usuários criados
  await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.send("Ok, aqui deu certo");
});

app.delete("/usuarios/:id", async (req, res) => {
  //DELETE deleta os usuários criados
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.send("Usuário deletado com sucesso");
});

app.listen(3000);
