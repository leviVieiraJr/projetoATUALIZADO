const Venda = require('../models/Venda');
const Cliente = require('../models/Cliente');

class VendaController {
  async createVenda(req, res) {
    try {
      const { dataVenda, clienteIdCliente } = req.body;
      console.log('ID do cliente recebido:', clienteIdCliente);

      const cliente = await Cliente.findByPk(clienteIdCliente);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      console.log('Criando venda com os dados:', {
        dataVenda,
        cliente_id_cliente: clienteIdCliente,
      });

      const venda = await Venda.create({
        dataVenda,
        cliente_id_cliente: clienteIdCliente, // Usando o nome exato da coluna
      });

      return res.status(201).json(venda);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar venda', details: error.message });
    }
  }

  async listarVenda(req, res) {
    try {
      const vendas = await Venda.findAll({
        include: [{ model: Cliente, as: 'cliente' }],
      });
      return res.status(200).json(vendas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar vendas' });
    }
  }

  async updateVenda(req, res) {
    try {
      const { id } = req.params;
      const venda = await Venda.findByPk(id);
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      const { dataVenda, clienteidcliente } = req.body;

      const cliente = await Cliente.findByPk(clienteidcliente);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const updatedVenda = await venda.update({
        dataVenda,
        clienteidcliente,
      });

      return res.status(200).json(updatedVenda);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar venda' });
    }
  }

  async deleteVenda(req, res) {
    try {
      const { id } = req.params;
      const venda = await Venda.findByPk(id);
      if (!venda) {
        return res.status(404).json({ error: 'Venda não encontrada' });
      }

      await venda.destroy();
      return res.status(200).json({ message: 'Venda deletada com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar venda' });
    }
  }
}

module.exports = new VendaController();
