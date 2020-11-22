module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('Tag', {
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

      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      }
    })

    Tag.getTagIdByName = async (tagName) => {
        try{
          const tag = await Tag.findOne({where: {name: tagName}});
          if (!tag){
            let err = new Error(`The tag ${tagName} does not exist in our database`);
            err.statusCode = 422;
            throw err;
          }
          return Promise.resolve(tag);
        } catch (err){
          throw err;
        }
      }
  
    Tag.associate = models => {
        Tag.belongsToMany(models.Question, {through: "questionTags"});
    };
  
    return Tag;
  };