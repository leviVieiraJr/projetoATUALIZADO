const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');
const Estoque = require('../models/Estoque');
const ItemVenda = require('../models/ItemVenda');
const Usuario = require('../models/Usuario');

const models = [Produto, Cliente, Venda, Estoque, ItemVenda, Usuario];

const sequelize = new Sequelize(databaseConfig);

models.forEach((model) => model.init(sequelize));
models.forEach((model) => model.associate && model.associate(sequelize.models));

/* models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models)); */

module.exports = sequelize;
