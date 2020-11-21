module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('tags', {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('GETDATE'),
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('GETDATE'),
          allowNull: false
        },
        name: {
          type: Sequelize.DataTypes.STRING,
          unique : true,
          allowNull: false
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('tags');
    }
  };