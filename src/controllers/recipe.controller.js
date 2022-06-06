const recipeService = require('../services/recipe.service')

const findOne = async ({ params }, res) => {
    const { id } = params

    try {
        const recipe = await recipeService.getRecipe(id)
        return res.status(200).json(recipe?.toJSON() ?? {})
    } catch (err) {
        console.error(err);
        return res.status(500).json({})
    }
}

const findAll = async (_, res) => {
    try {
        const recipes = await recipeService.getRecipes()
        return res.status(200).json(recipes)
    } catch (err) {
        console.error(err)
        return res.status(500).json([])
    }
}

const getHistory = async ({ query }, res) => {
    let { page = 0, limit = 10 } = query

    page = isNaN(page) ? 0 : page
    limit = isNaN(limit) ? 10 : limit

    try {
        return recipeService.getRecipesHistory(page, limit)
    } catch (err) {
        console.error(err)
        return res.status(500).json([])
    }
}

module.exports = {
    findOne,
    findAll,
    getHistory,
}