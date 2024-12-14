const {bootcamp, user} = require('../models');

module.exports = {

    async createBootcamp(data){
        return await bootcamp.create(data);
    },

    async findAll(){
        return await bootcamp.findAll({include:user});
    },

    async findById(id){
        return await bootcamp.findByPk(id, {include:user});
    },

}