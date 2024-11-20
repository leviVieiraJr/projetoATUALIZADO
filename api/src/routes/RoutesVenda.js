const express = require('express');
const VendaController = require('../controllers/VendaController');

const router = express.Router();

router.get('/vendas', VendaController.listarVenda);
router.post('/vendas', VendaController.createVenda);
router.put('/vendas/:id', VendaController.updateVenda);
router.delete('/vendas/:id', VendaController.deleteVenda);

module.exports = router;
