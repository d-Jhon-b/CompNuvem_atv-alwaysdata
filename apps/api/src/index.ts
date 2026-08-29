import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { db } from './db/index.js';
import { produtos } from './db/schema.js';

const app = express();
const PORT = process.env.PORT || 3000;


const allowedOrigins = [
  'https://compnuvem.vercel.app',
  'https://d-jhon-b.github.io/CompNuvem_atv-alwaysdata/'
];


app.use(cors({
  origin: (origin, callback)=>{if(!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin)!== -1){
      return callback(null, true)
    }else{return callback(new Error('Bloqueado pela politica de CORS'))}


  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:true
}));




app.use(express.json());


app.get('/', (req, res) => {
  res.json({ msg: "Atividade de computação em nuvem" });
});

app.get('/api/produtos', async (req, res) => {
  try {
    const listaProdutos = await db.select().from(produtos);
    res.json(listaProdutos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.post('/api/produtos', async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    
    if (!nome || !descricao) {
      return res.status(400).json({ error: 'Nome e descrição são obrigatórios' });
    }

    const resultado = await db.insert(produtos).values({ nome, descricao });
    res.status(201).json({ message: 'Produto criado com sucesso!', id: resultado[0].insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao inserir produto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
