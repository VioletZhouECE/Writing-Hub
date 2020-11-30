const { genSalt, hash, compare } = require('bcryptjs');

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
        defaultValue: sequelize.fn('GETDATE'),
        allowNull: false
      },

      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('GETDATE'),
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

      avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

    
    User.usernameExists = async (name) => {
      try{
        const user = await User.findOne({where:{username:name}});
        if (!user){
          return Promise.resolve(false);
        } else {
          return Promise.resolve(true);
        }
      } catch (err){
        throw err;
      }
    }

    User.prototype.storePasswordHash = async function() { 
      try{
        const salt = await genSalt(10);
        const passwordHash = await hash(this.password, salt);
        this.password = passwordHash;
        return Promise.resolve();
      } catch (err) {
        let error = new Error(`Hashing Password Failed: ${err.message}`);
        error.statusCode = 500;
        throw error;
      }
    }

    User.prototype.isValidPassword = async function(password){
      try{
        const result = await compare(password, this.password);
        return Promise.resolve(result);
      } catch (err){
        let error = new Error(`Validating Password Failed: ${err.message}`);
        error.statusCode = 500;
        throw error;
      }
    }
  
    User.associate = models => {
        User.belongsToMany(models.Language, {through: "FirstLanguageUsers", as: "FirstLanguage"});
        User.belongsToMany(models.Language, {through: "LearnLanguageUsers", as: "LearnLanguage"});
        User.hasMany(models.Journal);
        User.hasMany(models.Question);
    };
  
    return User;
  };