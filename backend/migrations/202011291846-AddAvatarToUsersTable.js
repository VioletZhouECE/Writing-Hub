module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('users', 'avatarUrl', {
        type: Sequelize.STRING,
        allowNull: true,
        after: "password"
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('users', 'avatarUrl');
    }
};