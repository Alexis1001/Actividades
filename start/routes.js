'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {

  Route.post('user/register','UserController.store');
  Route.post('user/login','UserController.login');
  
  Route.post('user/actividad','ActividadController.store');
  Route.get('actividad/list','ActividadController.index')
  
  Route.get('actividad/lista','ActividadController.indexActividad')
  Route.delete('actividad/delete/:id','ActividadController.destroy')
  Route.put('actividad/update/:id','ActividadController.update')


  Route.post('user/producto','ProductController.store');
  Route.post('producto/lista','ProductController.index');
  Route.delete('producto/delete/:id','ProductController.destroy');
 
}).prefix('api/v1/');

