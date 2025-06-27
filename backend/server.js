import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;
// Soporte para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'recetas.json');

app.use(cors());
app.use(express.json());

// Leer recetas
app.get('/api/recetas', (req, res) => {
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') return res.json([]);
      return res.status(500).json({ error: 'Error leyendo recetas' });
    }
    try {
      const recetas = JSON.parse(data);
      res.json(recetas);
    } catch (e) {
      res.status(500).json({ error: 'Error parseando recetas' });
    }
  });
});

// Guardar recetas
app.post('/api/recetas', (req, res) => {
  const recetas = req.body;
  fs.writeFile(DATA_FILE, JSON.stringify(recetas, null, 2), err => {
    if (err) return res.status(500).json({ error: 'Error guardando recetas' });
    res.json({ ok: true });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
