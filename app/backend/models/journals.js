module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('Journal', {
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

      comment: {
          type: DataTypes.TEXT,
          allowNull: true
      },

      viewsCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });

    Journal.prototype.incrementViewsCount = function(){
      this.viewsCount = this.viewsCount + 1;
    }
  
    Journal.associate = models => {
        Journal.belongsTo(models.Language);
        Journal.belongsTo(models.User);
        Journal.hasOne(models.EditedJournal);
    };
  
    return Journal;
  };