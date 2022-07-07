'use strict';
module.exports = {
  /**
   *
   * @param {import("sequelize").QueryInterface} queryInterface sdfvs
   * @param {import("sequelize").DataTypes} Sequelize sdgds
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      cryptPass: {
        type: Sequelize.TEXT('medium'),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  /**
   *
   * @param {import("sequelize").QueryInterface} queryInterface sdfvs
   * @param {import("sequelize").DataTypes} Sequelize sdgds
   */
  async down(queryInterface) {
    await queryInterface.dropTable('Users');
  },
};
