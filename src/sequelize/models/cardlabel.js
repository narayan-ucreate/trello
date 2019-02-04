'use strict';
module.exports = (sequelize, DataTypes) => {
  var CardLabel = sequelize.define('CardLabel', {
    cardId: DataTypes.STRING,
    labelId: DataTypes.STRING
  }, {});
  CardLabel.associate = function(models) {
    // associations can be defined here
  };
  return CardLabel;
};