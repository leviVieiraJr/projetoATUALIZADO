const Cliente = require('../models/Cliente');

class ClienteController {
  async createCliente(req, res) {
    const {
      nome,
      cpf,
      endereco,
      telefone,
    } = req.body;
    try {
      const produto = await Cliente.create({
        nome,
        cpf,
        endereco,
        telefone,
      });
      return res.status(201).json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar Cliente no controller', details: error.message });
    }
  }

  // Lista todos os clientes
  async listarCliente(req, res) {
    try {
      const clientes = await Cliente.findAll();
      return res.status(200).json(clientes);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar clientes', details: error.message });
    }
  }

  // Atualiza um cliente existente
  async updateCliente(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const updatedCliente = await cliente.update(req.body);
      return res.status(200).json(updatedCliente);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar cliente' });
    }
  }

  // Deleta um cliente
  async deleteCliente(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await cliente.destroy();
      return res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar cliente', details: error.message });
    }
  }
}

module.exports = new ClienteController();
