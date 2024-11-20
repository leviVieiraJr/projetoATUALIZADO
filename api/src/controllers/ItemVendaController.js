const ItemVenda = require('../models/ItemVenda');
const Produto = require('../models/Produto');

class ItemVendaController {
  // Cria um novo item de venda
  async createItemVenda(req, res) {
    try {
      const {
        vendaIdvenda,
        produtoIdProduto,
        quantidade,
        valorUnitario,
      } = req.body;
      if (!vendaIdvenda || !produtoIdProduto || !quantidade || !valorUnitario) {
        return res.status(400).json({ error: 'Dados inválidos: vendaIdvenda, produtoIdProduto, quantidade e valorUnitario são obrigatórios' });
      }

      if (!Number.isInteger(quantidade)) {
        return res.status(400).json({ error: 'A quantidade precisa ser um número inteiro' });
      }

      const produto = await Produto.findByPk(produtoIdProduto);
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      const valorTotal = quantidade * valorUnitario;
      const itemVenda = await ItemVenda.create({
        vendaIdvenda,
        produtoIdProduto,
        quantidade,
        valorUnitario,
        valorTotal,
      });

      return res.status(201).json(itemVenda);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar item de venda', details: error.message });
    }
  }

  // Lista todos os itens de venda
  async listarItemVenda(req, res) {
    try {
      const itensVenda = await ItemVenda.findAll({
        include: [{ model: Produto, as: 'produto' }],
      });
      return res.status(200).json(itensVenda);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar itens de venda', details: error.message });
    }
  }

  // Atualiza um item de venda existente
  async updateItemVenda(req, res) {
    try {
      const { id } = req.params;
      const itemVenda = await ItemVenda.findByPk(id);
      if (!itemVenda) {
        return res.status(404).json({ error: 'Item de venda não encontrado' });
      }

      const { produtoIdProduto, quantidade, valorUnitario } = req.body;

      const updatedItemVenda = await itemVenda.update({
        produtoIdProduto,
        quantidade,
        valorUnitario,
      });

      return res.status(200).json(updatedItemVenda);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar item de venda', details: error.message });
    }
  }

  // Deleta um item de venda
  async delete(req, res) {
    try {
      const { id } = req.params;
      const itemVenda = await ItemVenda.findByPk(id);
      if (!itemVenda) {
        return res.status(404).json({ error: 'Item de venda não encontrado' });
      }

      await itemVenda.destroy();
      return res.status(200).json({ message: 'Item de venda deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar item de venda' });
    }
  }
}

module.exports = new ItemVendaController();
