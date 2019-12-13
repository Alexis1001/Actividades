'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Producto extends Model {
    user(){
        return this.belongsTo('App/Models/Actividad');
    }
}

module.exports = Producto
