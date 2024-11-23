const express = require('express');
const ItemVendaController = require('../controllers/ItemVendaController');

const router = express.Router();

router.get('/financas', ItemVendaController.listarItemVenda);
router.post('/financas-venda', ItemVendaController.createItemVenda);
router.put('/financas/:id', ItemVendaController.updateItemVenda);
router.delete('/financas/:id', ItemVendaController.delete);

module.exports = router;
r