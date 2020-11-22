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
        defaultValue: sequelize.fn('GETDATE'),
        allowNull: false
      },

      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('GETDATE'),
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

      upvoteCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    });
  
    Question.associate = models => {
        Question.belongsToMany(models.Tag, {through: "questionTags"});
        Question.belongsTo(models.Language);
        Question.belongsTo(models.User);
    };
  
    return Question;
  };