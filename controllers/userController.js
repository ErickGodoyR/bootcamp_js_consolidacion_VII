const {user, bootcamp} = require('../models');

module.exports = {

    async createUser(data){
        return await user.create(data);
    },

    async findAll(){
        return await user.findAll({include:bootcamp});
    },

    async findById(id){
        return await user.findByPk(id, {include:bootcamp});
    },

    async updateUserById(id, data){
        return await user.update(data, {where:{id}});
    },

    async deleteUserById(id){
        return await user.destroy({where:{id}});
    },

}