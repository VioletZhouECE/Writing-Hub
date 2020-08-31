module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('firstLanguageUsers', {
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'users', key: 'id' }
      },
      LanguageId: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: { model: 'languages', key: 'id' }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('firstLanguageUsers');
  }
};