module.exports = (sequelize, DataTypes) => {
    const EditedJournal = sequelize.define('EditedJournal', {
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

      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },

      numOfContributors: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  
    EditedJournal.associate = models => {
        EditedJournal.belongsTo(models.Journal);
    };
  
    return EditedJournal;
  };