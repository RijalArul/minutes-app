'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // The name of the target table
          key: 'id' // The name of the target column
        },
        onUpdate: 'CASCADE', // Optional: This updates the foreign key if the referenced column is updated
        onDelete: 'SET NULL' // Optional: This sets the foreign key to null if the referenced row is deleted
      },
      transaction_date: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      payment_method: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions')
  }
}
