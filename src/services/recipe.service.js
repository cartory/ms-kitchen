const { Op } = require('sequelize')

const { Request, Recipe } = require('../settings/models')

const getRecipes = () => {
    try {
        return Recipe.findAll({ include: [{ association: 'ingredients' }] })
    } catch (err) {
        console.error(err);
        return []
    }
}

const getRecipe = (id) => {
    try {
        return Ingredient.findOne({ where: { id } })
    } catch (err) {
        console.error(err);
        throw new Error('Recipe Not Found')
    }
}

const getRecipesHistory = (page = 0, limit = 10) => {
    try {

        return Request.findAll({
            limit: limit,
            offset: page * limit,
            where: {
                RecipeId: {
                    [Op.not]: null
                }
            },
            include: ['recipe'],
        })
    } catch (err) {
        console.error(err)
        throw new Error("History not Found")
    }
}

const addRecipeHistory = async (recipe) => {
    try {
        await Request.create({ recipe })
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    getRecipe,
    getRecipes,
    addRecipeHistory,
    getRecipesHistory,
}
