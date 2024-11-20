const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

class UsuarioController {
  async createUsuario(req, res) {
    try {
      const { email, senha, telefone } = req.body;

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'E-mail já está em uso' });
      }
      const hashsenha = await bcrypt.hash(senha, 10);
      const usuario = await Usuario.create({ email, senha: hashsenha, telefone });
      return res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso!',
        usuario: {
          id_usuario: usuario.id_usuario,
          email: usuario.email,
          telefone: usuario.telefone,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Erro ao criar usuário',
        details: error.message,
      });
    }
  }

  // Listar todos os usuários
  async listarUsuario(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id_usuario', 'email'],
      });
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error.message);
      return res.status(500).json({ error: 'Erro ao listar usuários', details: error.message });
    }
  }

  // Função de login
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciais inválidas (Email)' });
      }
      const isMatch = await bcrypt.compare(senha, usuario.senha);
      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciais inválidas(Senha)' });
      }

      const token = jwt.sign(
        { user: { id_usuario: usuario.id_usuario, email: usuario.email } },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
      );

      return res.json({
        token,
        user: {
          id_usuario: usuario.id_usuario,
          email: usuario.email,
        },
      });
    } catch (error) {
      console.log('Erro ao realizar login:', error.message);
      return res.status(500).json({ error: 'Erro ao realizar login', details: error.message });
    }
  }

  // editar usuario
  async editusuario(req, res) {
    try {
      const { id } = req.params;
      const { email, senha, telefone } = req.body;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      if (email) {
        usuario.email = email;
      }
      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        usuario.senha = hashedPassword;
      }
      if (telefone) {
        usuario.telefone = telefone;
      }
      await usuario.save();
      return res.status(200).json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        usuario: {
          id_usuario: usuario.id_usuario,
          email: usuario.email,
          telefone: usuario.telefone,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
  }

  // Excluir Algum Usuario
  async excluirUsuario(req, res) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      await usuario.destroy();
      return res.status(200).json({ success: true, message: 'Usuário excluído com sucesso' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir usuário', details: error.message });
    }
  }
}

module.exports = new UsuarioController();
