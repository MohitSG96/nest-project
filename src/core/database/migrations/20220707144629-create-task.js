'use strict';

module.exports = {
  /**
   *
   * @param {import("sequelize").QueryInterface} queryInterface sdfvs
   * @param {import("sequelize")} Sequelize sdgds
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT('medium'),
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Tasks');
  },
};
