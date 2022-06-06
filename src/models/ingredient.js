const { Model, DataTypes } = require('sequelize')

const sequelize = require('./sequelize')

class Ingredient extends Model { }

Ingredient.init({
    id: {
        key: 'id',
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    name: {
        key: 'name',
        unique: true,
        type: DataTypes.STRING,
    },
    stock: {
        key: 'stock',
        type: DataTypes.INTEGER,
        defaultValue: 5,
    },

    minimumStock: {
        key: 'minimumStock',
        type: DataTypes.INTEGER,
        defaultValue: 10,
    }
}, {
    sequelize,
    paranoid: true,
    timestamps: true,
})

module.exports = { Ingredient }