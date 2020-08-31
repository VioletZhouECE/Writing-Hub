module.exports = (sequelize, DataTypes) => {
    const Language = sequelize.define('Language', {
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

      languageName: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    Language.associate = models => {
      Language.belongsToMany(models.User, {through: "FirstLanguageUsers", as: "FirstLanguage"});
      Language.belongsToMany(models.User, {through: "LearnLanguageUsers", as: "LearnLanguage"});
    };
  
    return Language;
  };