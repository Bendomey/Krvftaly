'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    short_description: DataTypes.STRING,
    description: DataTypes.TEXT,
    pics: DataTypes.STRING,
    categoryId:DataTypes.INTEGER,
    rating: DataTypes.ENUM('1','2','3','4','5'),
    information: DataTypes.STRING,
    availability:DataTypes.ENUM('0','1')
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Review);
    Product.belongsTo(models.Category);
  };
  return Product;
};