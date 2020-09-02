module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('questions', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false
          },
    
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
            references: {
                model: "users",
                key: "id"
            } 
        },

        LanguageId: {
            type: Sequelize.UUID,
            references: {
                model: "languages",
                key: "id"
            }
        },

        title: {
            type: Sequelize.STRING,
            allowNull: false
        },

        body: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        upvoteCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('questions');
    }
  };