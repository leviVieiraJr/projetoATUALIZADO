const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
  static associate(models) {
    this.hasMany(models.ItemVenda, { foreignKey: 'produto_id_produto', as: 'itensVenda' });
    this.hasOne(models.Estoque, { foreignKey: 'produto_id_produto', as: 'estoque' });
  }

  static init(sequelize) {
    super.init({
      id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_produto',
      },
      nomeProduto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome do produto precisa ter entre 3 e 255 caracteres.',
          },
        },
        field: 'nome_produto',
      },
      marca: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 25],
            msg: 'A marca precisa ter entre 3 e 25 caracteres.',
          },
        },
      },
      categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 100],
            msg: 'A Categoria precisa ter entre 3 e 100 caracteres.',
          },
        },
      },
      preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Preço precisa ser um número inteiro ou de ponto flutuante',
          },
        },
      },
      codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Código precisa ser um número inteiro',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'produto',
      timestamps: true,
    });
    return this;
  }
}

module.exports = Produto;
