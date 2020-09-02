module.exports = (sequelize, DataTypes) => {
    const Question = sequelize.define('Question', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },

      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
        allowNull: false
      },

      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
        allowNull: false
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      upvotesCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  
    Question.associate = models => {
        Question.belongsTo(models.Language);
        Question.belongsTo(models.User);
    };
  
    return Question;
  };