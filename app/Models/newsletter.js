'use strict';
module.exports = (sequelize, DataTypes) => {
  const Newsletter = sequelize.define('Newsletter', {
    email: DataTypes.STRING
  }, {});
  Newsletter.associate = function(models) {
    // associations can be defined here
  };
  return Newsletter;
};