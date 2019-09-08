'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        required:true
      },
      email: {
        type: Sequelize.STRING,
        required:true
      },
      review: {
        type: Sequelize.TEXT,
        required:true
      },
      rating: {
        type: Sequelize.ENUM('1','2','3','4','5'),
        required:true
      },
      productId:{
        type:Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};