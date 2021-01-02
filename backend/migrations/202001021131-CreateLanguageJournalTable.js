module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('LanguageJournals', {
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
        LanguageId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: { model: 'languages', key: 'id' }
        },
        JournalId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: { model: 'journals', key: 'id' }
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('LanguageJournals');
    }
  };