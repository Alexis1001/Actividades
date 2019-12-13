'use strict'

const { test, trait } = use('Test/Suite')('User')
trait('Auth/Client')
trait('Test/ApiClient')

const User = use('App/Models/User')
const Actividad=use('App/Models/Actividad') 

const test_user = {
  username:'test_user',
  email:'test@yopmail.com',
  password:'password',
}


test('[Login] Acceso con Login correcto', async ({ client }) => {

  const user = await User.create(test_user)

  const response = await client.post('/api/v1/user/login').send({
    email:'test@yopmail.com',
    password: 'password',
  }).end()
  response.assertStatus(200)
  await user.delete()
}).timeout(0)