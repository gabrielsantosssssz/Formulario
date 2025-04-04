import { PrismaClient } from '@prisma/client';
import express from 'express';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Endpoint para criar um usuário
app.post('/usuarios', async (req, res) => {
  console.log("Recebendo dados:", req.body); 

  const { email, name, telefone } = req.body;

  if (!email || !name || !telefone || typeof telefone !== "string") {
    return res.status(400).json({ error: "Campos obrigatórios faltando ou inválidos" });
  }

  try {
    const newUser = await prisma.user.create({
      data: { email, name, telefone }
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o usuário" });
  }
});

// Endpoint para atualizar um usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    console.log("Recebendo requisição:", req.params, req.body);

    const usuarioAtualizado = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        telefone: req.body.telefone
      }
    });

    res.json({ message: "Usuário atualizado com sucesso!", usuario: usuarioAtualizado });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// Endpoint para deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    console.log("Recebendo requisição para deletar:", req.params.id);

    await prisma.user.delete({
      where: { id: req.params.id }
    });

    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Usuário não encontrado!" });
    }

    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
});

// Endpoint para listar os usuários
app.get('/usuarios', async (req, res) => {
  try {
    console.log('Parâmetro name:', req.query.name);

    let users = [];

    if (req.query.name) {
      users = await prisma.user.findMany({
        where: { name: req.query.name },
      });
    } else {
      users = await prisma.user.findMany();
    }

    res.json(users);
  } catch (error) {
    console.error("Erro ao obter os usuários:", error);
    res.status(500).json({ error: "Erro ao obter os usuários" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
