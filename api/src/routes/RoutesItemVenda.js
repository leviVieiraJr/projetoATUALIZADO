const express = require('express');
const ItemVendaController = require('../controllers/ItemVendaController');

const router = express.Router();

router.get('/item-venda', ItemVendaController.listarItemVenda);
router.post('/item-venda', ItemVendaController.createItemVenda);
router.put('/item-venda/:id', ItemVendaController.updateItemVenda);
router.delete('/item-venda/:id', ItemVendaController.delete);

module.exports = router;
