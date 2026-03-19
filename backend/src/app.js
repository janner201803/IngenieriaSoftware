const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const facultadRoutes = require('./routes/facultadRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const secretariaRoutes = require('./routes/secretariaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/facultades', facultadRoutes);
app.use('/api/docentes', docenteRoutes);
app.use('/api/secretarias', secretariaRoutes);

// Manejador de errores global (para errores pasados con next)
app.use((err, req, res, next) => {
  console.error('Error global:', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

// Middleware para rutas no encontradas (404)
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;