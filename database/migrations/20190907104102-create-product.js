'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
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
      price: {
        type: Sequelize.STRING,
        required:true
      },
      short_description: {
        type: Sequelize.STRING,
        required:true
      },
      description: {
        type: Sequelize.TEXT,
        required:true
      },
      pics: {
        type: Sequelize.STRING,
        required:true
      },
      rating: {
        type: Sequelize.ENUM('1','2','3','4','5'),
        required:true
      },
      information: {
        type: Sequelize.STRING
      },
      availability:{
        type:Sequelize.ENUM('0','1'),
        defaultValue:'0',
        required:true
      },
      categoryId:{
        type:Sequelize.INTEGER,
        required:true
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
    return queryInterface.dropTable('Products');
  }
};