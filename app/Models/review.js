'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    review: DataTypes.TEXT,
    rating: DataTypes.ENUM('1','2','3','4','5')
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Product);
  };
  return Review;
};