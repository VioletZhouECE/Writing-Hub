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
  
    Tag.associate = models => {
        Tag.belongsToMany(models.Question);
    };
  
    return Tag;
  };