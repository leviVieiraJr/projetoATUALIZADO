const Produto = require('../models/Produto');

class ProdutoController {
  async createProduto(req, res) {
    const {
      nomeProduto,
      marca,
      categoria,
      preco,
      codigo,
    } = req.body;
    try {
      const produto = await Produto.create({
        nomeProduto,
        marca,
        categoria,
        preco,
        codigo,
      });
      return res.status(201).json(produto);
    } catch (error) {
      console.error(error); console.log(req.body);
      return res.status(500).json({ error: 'Erro ao criar produto no controller', details: error });
    }
  }

  async listarProduto(req, res) {
    try {
      const produto = await Produto.findAll();
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar os Produtos' });
    }
  }

  async updateProduto(req, res) {
    const { id } = req.params;
    const {
      nomeProduto,
      marca,
      categoria,
      preco,
    } = req.body;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      await produto.update({
        nomeProduto,
        marca,
        categoria,
        preco,
      });
      return res.json(produto);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  }

  async deleteProduto(req, res) {
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      await produto.destroy();
      return res.json({ message: 'Produto deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
}

module.exports = new ProdutoController();
