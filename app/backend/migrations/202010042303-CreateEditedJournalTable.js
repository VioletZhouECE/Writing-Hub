module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('editedJournals', {
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

        JournalId: {
            type: Sequelize.UUID,
            references: {
                model: "journals",
                key: "id"
            } 
        },

        body: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        numOfContributors: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
      });
    },
    
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('editedJournals');
    }
  };