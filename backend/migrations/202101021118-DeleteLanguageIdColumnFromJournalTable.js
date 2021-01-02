module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('journals', 'LanguageId');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('journals', 'LanguageId', {
        type: Sequelize.UUID,
        references: {
            model: "languages",
            key: "id"
        }
        });
    }
};