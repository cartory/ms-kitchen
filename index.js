require('dotenv').config()

const { io } = require('socket.io-client')

const app = require('./src/app')
const recipeService = require('./src/services/recipe.service')
const delayInMilliseconds = 2000

const socket = io(process.env.HOST_MS_RESTAURANT, {
	transports: ['websocket']
})

socket.on("recipe-request", data => {
	const { requestState, recipe, foodReady } = data
	
	if (requestState === "cook") {
		try {
			if (foodReady) {
				data.requestState = "ready"
			} else {
				data.requestState = "prepare"
				recipeService.addRecipeHistory(recipe.id).finally()
			}

			setTimeout(() => {
				socket.emit("recipe-response", { ...data, foodReady })
			}, delayInMilliseconds);
		} catch (err) {
			console.error(err);
			data.requestState = "error"
			setTimeout(() => {
				socket.emit("recipe-response", data)
			}, delayInMilliseconds);
		}
	}
})

app.listen(process.env.PORT || 4000, () => {
	console.log(new Date())
	console.log(`Server running on \x1b[33mhttp://${process.env.HOST}:${process.env.PORT}\x1b[0m`)
})