'use strict';
module.exports = (sequelize, DataTypes) => {
  var Label = sequelize.define('Label', {
    name: DataTypes.STRING
  }, {});
  Label.associate = function(models) {
    // associations can be defined here
  };
  return Label;
};