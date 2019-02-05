'use strict';
module.exports = (sequelize, DataTypes) => {
  var Member = sequelize.define('Member', {
    name: DataTypes.STRING
  }, {});
  Member.associate = function(models) {
    // associations can be defined here
    Member.hasMany(models.CardMember, {foreignKey: 'memberId'})
  };
  return Member;
};