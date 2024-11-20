const express = require('express');
const dotenv = require('dotenv');
const produtoRoutes = require('./src/routes/RoutesProduto');
const vendaRoutes = require('./src/routes/RoutesVenda');
const itemVendaRoutes = require('./src/routes/RoutesItemVenda');
const RoutesUser = require('./src/routes/RoutesUser');
const clienteRoutes = require('./src/routes/RoutesCliente');
const estoqueRoutes = require('./src/routes/RoutesEstoque');

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use('/api', clienteRoutes);
    this.app.use('/api', produtoRoutes);
    this.app.use('/api', vendaRoutes);
    this.app.use('/api', itemVendaRoutes);
    this.app.use('/api', RoutesUser);
    this.app.use('/api', estoqueRoutes);
  }
}
module.exports = new App().app;
