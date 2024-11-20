const { Model, DataTypes } = require('sequelize');

class Cliente extends Model {
  static associate(models) {
    this.hasMany(models.Venda, { foreignKey: 'cliente_id_cliente', as: 'vendas' });
  }

  static init(sequelize) {
    super.init({
      id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_cliente',
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'Nome precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 14],
            msg: 'cpf precisa ter entre 3 e 14 caracteres.',
          },
        },
      },
      endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'endereco precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'telefone precisa ter entre 3 e 255 caracteres.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'cliente',
      timestamps: true,
    });
    return this;
  }
}

module.exports = Cliente;
