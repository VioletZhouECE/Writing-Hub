module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('journals', {
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

        comment: {
            type: Sequelize.TEXT,
            allowNull: true
        },

        viewsCount: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('journals');
    }
  };