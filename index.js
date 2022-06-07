require('dotenv').config()

const { io } = require('socket.io-client')

const app = require('./src/app')
const recipeService = require('./src/services/recipe.service')

const socket = io(process.env.HOST_MS_RESTAURANT, {
	transports: ['websocket']
})

socket.on("recipe-request", data => {
	const { requestState, recipe, foodReady = false } = data

	if (requestState === "cook") {
		try {
			data.requestState = "prepare"

			if (!foodReady) {
				data.requestState = "deliver"
				recipeService.addRecipeHistory(recipe.name)
			} else {
				data.requestState = "prepare"
			}

			socket.emit("recipe-response", data)
		} catch (err) {
			console.error(err);
			data.requestState = "error"
			socket.emit("recipe-response", data)
		}
	}
})

app.listen(process.env.PORT || 3000, () => {
	console.log(new Date())
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
})