require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '47856918',
  database: process.env.DATABASE || 'banco_PI',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    timezone: 'Etc/GMT-3',
  },
  timezone: '-03:00',
};
