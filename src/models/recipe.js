const { Model, DataTypes } = require('sequelize')

const sequelize = require('./sequelize')
const { Ingredient } = require('./ingredient')

class Recipe extends Model { }

Recipe.init({
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
}, {
    sequelize,
    paranoid: true,
    timestamps: true,
})

Ingredient.belongsToMany(Recipe, { as: 'recipes' })
Recipe.belongsToMany(Ingredient, { as: 'ingredients' })

module.exports = { Recipe, Ingredient }