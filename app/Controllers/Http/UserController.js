'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User=use("App/Models/User");
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response, view }) {
    const user= await User.all();
    return response.json({user});
  }

  
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data=request.all();
    const user=new User();
    user.username=data.username;
    user.email=data.email;
    user.password=data.password;
    if(data.username==null||data.email==null||data.password==null){
      return response.json({message:'null data not allowed'});
    }
    else{
      await user.save();
      return this.login(...arguments); 
    }
  }
  async login({request,response,auth}){
    const data=request.all();
    const token=await auth.attempt(data.email,data.password);  
    const user =await User.findByOrFail('email',data.email);
    
    if(user){
        var usuario={
        id:user.id,
        username:user.username,
        email:user.email,
        token:token.token,
      }
      return response.json({usuario});
    }
    return response.status(404);
  }


  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }


  async destroy ({ params, request, response }) {
  }
}

module.exports = UserController
