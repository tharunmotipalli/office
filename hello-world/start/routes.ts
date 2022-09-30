import Route from '@ioc:Adonis/Core/Route'


Route.post('/circuitData','ClearvuesController.getResult')
Route.post('/generateToken','ClearvuesController.generateToken')