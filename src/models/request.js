const { Model, DataTypes } = require('sequelize')

const sequelize = require('./sequelize')

class Request extends Model { }

Request.init({
    id: {
        key: 'id',
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        autoIncrementIdentity: true,
    },
    recipe: {
        key: 'recipe',
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    paranoid: true,
    timestamps: true,
    defaultScope: {
        attributes: {
            include: ['createdAt'],
            exclude: ['updatedAt', 'deletedAt']
        },
    }
})

module.exports = { Request }