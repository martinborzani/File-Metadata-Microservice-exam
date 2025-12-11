'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// CORS 
app.use(cors({ optionsSuccessStatus: 200 }));

// Archivos estáticos
app.use('/public', express.static(process.cwd() + '/public'));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configuración de multer
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint de carga de archivos
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.json({ error: 'No file uploaded' });
  }

  return res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
});

// Levantar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('File Metadata Microservice listening on port ' + port);
});

module.exports = app;
