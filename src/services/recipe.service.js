const { Op } = require('sequelize')

const { Request, Recipe } = require('../settings/models')

const getRecipes = () => {
    try {
        return Recipe.findAll({ include: ['ingredients'] })
    } catch (err) {
        console.error(err);
        return []
    }
}

const getRecipe = (id) => {
    try {
        return Recipe.findOne({ where: { id }, include: ['ingredients'] })
    } catch (err) {
        console.error(err);
        throw new Error('Recipe Not Found')
    }
}

const getRecipesHistory = (page = 0, limit = 15) => {
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
            order: [["createdAt", "DESC"]]
        })
    } catch (err) {
        console.error(err)
        throw new Error("History not Found")
    }
}

const addRecipeHistory = async (recipeId) => {
    try {
        await Request.create({ recipeId })
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
