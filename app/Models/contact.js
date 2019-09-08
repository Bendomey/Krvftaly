'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    contact: DataTypes.STRING,
    message: DataTypes.STRING,
    attended:DataTypes.ENUM('0','1')
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};