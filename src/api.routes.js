const { Router } = require('express')

const recipeController = require('./controllers/recipe.controller')

const router = Router()

router
    // 
    .get('/recipes', recipeController.findAll)
    .get('/recipes/:id', recipeController.findOne)
    .get('/history/recipes', recipeController.getRecipesHistory)

module.exports = router