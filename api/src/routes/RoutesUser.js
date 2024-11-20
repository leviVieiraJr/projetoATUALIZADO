const express = require('express');

const router = express.Router();
const UsuarioController = require('../controllers/UserController');
const Auth = require('../middlewares/Auth');
const RecoverPassController = require('../controllers/recoverPassControler');

router.post('/register', (req, res) => UsuarioController.createUsuario(req, res));
router.post('/login', (req, res) => UsuarioController.login(req, res));

router.get('/usuarios', Auth, (req, res) => UsuarioController.listarUsuario(req, res));
router.put('/usuarios/:id', Auth, (req, res) => UsuarioController.editusuario(req, res));
router.delete('/usuarios/:id', Auth, (req, res) => UsuarioController.excluirUsuario(req, res));

router.post('/esqueci-senha', (req, res) => RecoverPassController.recoverPass(req, res));
router.post('/redefinir-senha', (req, res) => RecoverPassController.redefinirSenha(req, res));

module.exports = router;
