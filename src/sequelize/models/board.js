'use strict';
module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    name: DataTypes.STRING,
    memberSync: DataTypes.BOOLEAN,
    labelSync: DataTypes.BOOLEAN,
    listSync:  DataTypes.BOOLEAN
    
  }, {});
  Board.associate = function(models) {
    // associations can be defined here
  };
  return Board;
};