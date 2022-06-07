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

const getRecipesHistory = async ({ query }, res) => {
    let { page = 0, limit = 15 } = query

    page = isNaN(page) ? 0 : Number(page)
    limit = isNaN(limit) ? 15 : Number(limit)

    try {
        const history = await recipeService.getRecipesHistory(page, limit)
        return res.status(200).json(history)
    } catch (err) {
        console.error(err)
        return res.status(500).json([])
    }
}

module.exports = {
    findOne,
    findAll,
    getRecipesHistory,
}