import Route from '@ioc:Adonis/Core/Route'

Route.get('/read','ClearvuesController.read')
Route.post('/generate','ClearvuesController.generateToken')
Route.post('/get','ClearvuesController.getChdata')
Route.get('read/:CustomerId/:StartDate/:EndDate/:Resolution','ClearvuesController.getData')