'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserAccessToken = sequelize.define('UserAccessToken', {
    memberId: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    accessTokenSecret: DataTypes.STRING
  }, {});
  UserAccessToken.associate = function(models) {
    // associations can be defined here
  };
  return UserAccessToken;
};