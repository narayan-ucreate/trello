'use strict';
module.exports = (sequelize, DataTypes) => {
  var CardMember = sequelize.define('CardMember', {
    memberId: DataTypes.STRING,
    cardId: DataTypes.STRING
  }, {});
  CardMember.associate = function(models) {
    // associations can be defined here
  };
  return CardMember;
};