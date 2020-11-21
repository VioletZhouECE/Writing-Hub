module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('questionTags', {
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
        TagId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: { model: 'tags', key: 'id' }
        },
        QuestionId: {
          type: Sequelize.UUID,
          primaryKey: true,
          references: { model: 'questions', key: 'id' }
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('questionTags');
    }
  };