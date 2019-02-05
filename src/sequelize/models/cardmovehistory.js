'use strict';
module.exports = (sequelize, DataTypes) => {
  var CardMoveHistory = sequelize.define('CardMoveHistory', {
    cardId: DataTypes.STRING,
    listFromId: DataTypes.STRING,
    ListToId: DataTypes.STRING,
    memberId: DataTypes.STRING
  }, {});
  CardMoveHistory.associate = function(models) {
    CardMoveHistory.belongsTo(models.Card, {foreignKey: 'cardId'})
    // associations can be defined here
  };
  return CardMoveHistory;
};