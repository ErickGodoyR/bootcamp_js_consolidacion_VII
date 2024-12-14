'use strict';
module.exports = (sequelize, DataTypes) => {
  const bootcamp = sequelize.define('bootcamp', {
    title: {type:DataTypes.STRING, allowNull:false},
    cue:{type:DataTypes.INTEGER, allowNull:false},
    descripcion:{type:DataTypes.STRING, allowNull:false},
  },
  ); 
  
  bootcamp.associate = function (models) {
    // relación muchos a muchos con receta
    bootcamp.belongsToMany(models.user, {
      through:'userBootcamp',
      foreignKey: 'bootcampId',
      otherKey: 'userId',
    });
  };

  return bootcamp;
};