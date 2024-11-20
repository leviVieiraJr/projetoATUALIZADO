const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

router.get('/clientes', ClienteController.listarCliente);
router.post('/clientes', ClienteController.createCliente);
router.put('/clientes/:id', ClienteController.updateCliente);
router.delete('/clientes/:id', ClienteController.deleteCliente);

module.exports = router;
