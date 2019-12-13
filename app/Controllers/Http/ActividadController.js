'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Actividad=use('App/Models/Actividad')
const User=use("App/Models/User");
const Database = use('Database');
class ActividadController {
  /**
   * Show a list of all actividads.
   * GET actividads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const actividades=await Actividad.query()
    .with('productos')
    .fetch()
    //.with('user')
    //.fetch()
    return response.json({actividades})
  }

  async indexActividad({request,response,auth}){
    const user =await auth.getUser(); 
    const actividades=await Database.table('users')
    .innerJoin('actividads','users.id','actividads.user_id')
    .where('users.id',user.id)
    .select('users.username','users.email','actividads.id','actividads.actividad','actividads.fecha','actividads.hora')
    return response.json({actividades})
  }

  /**
   * Render a form to be used for creating a new actividad.
   * GET actividads/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new actividad.
   * POST actividads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,auth}) {
    const user = await auth.getUser();
    const data=request.all();
    const actividad=new Actividad();
    actividad.actividad=data.actividad;
    actividad.fecha=data.fecha;
    actividad.hora=data.hora;
    actividad.user_id=user.id;
    await actividad.save();
    return response.json({actividad});
  }


  /**
   * Display a single actividad.
   * GET actividads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing actividad.
   * GET actividads/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update actividad details.
   * PUT or PATCH actividads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const id=params.id;
    const data=request.all()
    const actividad= await Actividad.find(id);
    actividad.merge({
      actividad:data.actividad,
      fecha:data.fecha,
      hora:data.hora,
    })
    await actividad.save();
    return response.json({actividad});
  }

  /**
   * Delete a actividad with id.
   * DELETE actividads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const id=params.id
    const actividad= await Actividad.find(id);
    await actividad.delete();
    return response.json({actividad});
  }

}

module.exports = ActividadController
