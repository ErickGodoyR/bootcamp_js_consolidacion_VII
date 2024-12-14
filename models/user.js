'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    
    firstName: {type:DataTypes.STRING, allowNull:false},
    lastName:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, allowNull:false,unique:true},
  },
  );

  user.associate = function(models){
    user.belongsToMany(models.bootcamp, {
      through: 'userBootcamp',
      foreignKey: 'userId',
      otherKey: 'bootcampId',
    });
  };
  
  return user;

};