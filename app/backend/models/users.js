module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
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

      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
      points: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
      }
    });
  
    User.associate = models => {
        User.belongsToMany(models.Language, {through: "FirstLanguageUsers", as: "FirstLanguage"});
        User.belongsToMany(models.Language, {through: "LearnLanguageUsers", as: "LearnLanguage"});
    };
  
    return User;
  };