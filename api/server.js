const app = require('./app');
const sequelize = require('./src/database/index');

const port = process.env.APP_PORT || 4400;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log('Banco de dados sincronizado');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });
