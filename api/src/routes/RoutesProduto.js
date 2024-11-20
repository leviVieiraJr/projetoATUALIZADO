const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();

router.get('/produtos', ProdutoController.listarProduto);
router.post('/produtos', ProdutoController.createProduto);
router.put('/produtos/:id', ProdutoController.updateProduto);
router.delete('/produtos/:id', ProdutoController.deleteProduto);

module.exports = router;
