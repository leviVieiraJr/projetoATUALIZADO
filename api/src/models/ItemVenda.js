const { Model, DataTypes } = require('sequelize');

class ItemVenda extends Model {
  static associate(models) {
    this.belongsTo(models.Venda, { foreignKey: 'venda_id_venda', as: 'venda' });
    this.belongsTo(models.Produto, { foreignKey: 'produto_id_produto', as: 'produto' });
  }

  static init(sequelize) {
    super.init({
      id_itemvenda: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_itemvenda',
      },
      quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'A Quantidade precisa ser um número inteiro',
          },
        },
      },
      valorUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'valor_unitario',
        validate: {
          isFloat: {
            msg: 'O Valor Unitario precisa ser um número inteiro ou de ponto flutuante',
          },
        },
      },
      valorTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
        field: 'valor_total',
        validate: {
          isFloat: {
            msg: 'O Valor Total precisa ser um número inteiro ou de ponto flutuante',
          },
        },
      },
      produtoIdProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'produto_id_produto',
      },
      vendaIdvenda: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'venda_id_venda',
      },
    }, {
      sequelize,
      tableName: 'itemvenda',
      timestamps: true,
    });
    return this;
  }
}

module.exports = ItemVenda;
