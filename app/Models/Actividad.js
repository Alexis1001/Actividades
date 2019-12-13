'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Actividad extends Model {
    productos() {
        return this.hasMany('App/Models/Producto')
    }
    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Actividad
