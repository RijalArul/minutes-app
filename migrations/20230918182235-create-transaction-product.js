'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TransactionProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // The name of the target table
          key: 'id' // The name of the target column
        },
        onUpdate: 'CASCADE', // Optional: This updates the foreign key if the referenced column is updated
        onDelete: 'SET NULL' // Optional: This sets the foreign key to null if the referenced row is deleted
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products', // The name of the target table
          key: 'id' // The name of the target column
        },
        onUpdate: 'CASCADE', // Optional: This updates the foreign key if the referenced column is updated
        onDelete: 'SET NULL' // Optional: This sets the foreign key to null if the referenced row is deleted
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Transactions', // The name of the target table
          key: 'id' // The name of the target column
        },
        onUpdate: 'CASCADE', // Optional: This updates the foreign key if the referenced column is updated
        onDelete: 'SET NULL' // Optional: This sets the foreign key to null if the referenced row is deleted
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_price: {
        type: Sequelize.DECIMAL(10, 2)
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
    await queryInterface.dropTable('TransactionProducts')
  }
}
