const { Model, DataTypes } = require('sequelize');

class Estoque extends Model {
  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: 'produto_id_produto', as: 'produto' });
  }

  static init(sequelize) {
    super.init({
      idEstoque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_estoque',
      },
      quantidadeEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'A quantidade precisa ser um número inteiro',
          },
        },
        field: 'quantidadeEstoque', // Altere para corresponder ao nome exato no banco de dados
      },
      quantidadeMin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'A quantidade precisa ser um número inteiro',
          },
        },
        field: 'quantidadeMin', // Altere para corresponder ao nome exato no banco de dados
      },
      quantidadeMax: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'A quantidade precisa ser um número inteiro',
          },
        },
        field: 'quantidadeMax', // Altere para corresponder ao nome exato no banco de dados
      },
      produtoIdProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'produto_id_produto',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at', // Mapeando para `created_at` no banco de dados
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at', // Mapeando para `updated_at` no banco de dados
      },
    }, {
      sequelize,
      tableName: 'estoque',
      timestamps: true,
    });
    return this;
  }
}

module.exports = Estoque;
