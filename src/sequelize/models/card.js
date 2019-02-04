'use strict';
module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    name: DataTypes.STRING,
    boardId: DataTypes.STRING,
    cardCreatedDate: DataTypes.DATE
  }, {});
  Card.associate = function(models) {
    // associations can be defined here
  };
  return Card;
};