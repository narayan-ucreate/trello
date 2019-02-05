'use strict';
module.exports = (sequelize, DataTypes) => {
  var CardMember = sequelize.define('CardMember', {
    memberId: DataTypes.STRING,
    cardId: DataTypes.STRING
  }, {});
  CardMember.associate = function(models) {
    // associations can be defined here
    CardMember.belongsTo(models.Card, {foreignKey: 'cardId'})
    CardMember.belongsTo(models.Member, {foreignKey: 'memberId'})
    
  };
  return CardMember;
};