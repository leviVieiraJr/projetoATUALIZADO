require('dotenv').config();
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Configuração do Nodemailer para enviar o e-mail
const transporter = nodemailer.createTransport({
  service: 'gmail', // ou o serviço de e-mail que você estiver usando
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class RecoverPassController {
  async recoverPass(req, res) {
    try {
      const { email } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado...' });
      }

      // Gera um token de redefinição de senha com validade de 15 minutos
      const token = jwt.sign({ id_usuario: usuario.id_usuario }, process.env.JWT_RESET_SECRET, { expiresIn: '2h' });

      await client.messages.create({
        body: `Seu código de redefinição de senha é: ${token}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: usuario.telefone,
      });
      // Envia o token por e-mail para o usuário cadastrado
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: usuario.email,
        subject: 'Redefinição de Senha',
        text: `

        Seu código de redefinição de senha é:

        ${token}`,
      });

      return res.status(200).json({ message: 'Token de recuperação enviado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao enviar token de recuperação', details: error.message });
    }
  }

  // Método para redefinir a senha usando o token
  async redefinirSenha(req, res) {
    try {
      const { codigo, novaSenha } = req.body;
      if (!codigo) return res.status(400).json({ error: 'Token não fornecido' });

      // Verifica e decodifica o token
      let decoded;
      try {
        decoded = jwt.verify(codigo, process.env.JWT_RESET_SECRET);
      } catch (error) {
        console.log('Erro ao decodificar o token:', error.message);
        return res.status(400).json({ error: 'Token inválido ou expirado.' });
      }

      // Encontra o usuário pelo ID
      const usuario = await Usuario.findOne({ where: { id_usuario: decoded.id_usuario } });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Hash da nova senha e salva no banco
      usuario.senha = await bcrypt.hash(novaSenha, 10);
      await usuario.save();

      return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(400).json({ error: 'Token expirado. Solicite um novo token de recuperação.' });
      }
      return res.status(500).json({ error: 'Erro ao redefinir a senha', details: error.message });
    }
  }
}

module.exports = new RecoverPassController();
