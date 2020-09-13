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

      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
    });

    Language.getLanguageByName = async (languageName) => {
      try{
        const language = await Language.findOne({where: {name: languageName}});
        if (!language){
          let err = new Error(`The language ${languageName} does not exist in our database`);
          err.statusCode = 422;
          throw err;
        }
        return Promise.resolve(language);
      } catch (err){
        throw err;
      }
    }
  
    Language.associate = models => {
      Language.belongsToMany(models.User, {through: "FirstLanguageUsers", as: "FirstLanguage"});
      Language.belongsToMany(models.User, {through: "LearnLanguageUsers", as: "LearnLanguage"});
      Language.hasMany(models.Journal);
      Language.hasMany(models.Question);
    };
  
    return Language;
  };