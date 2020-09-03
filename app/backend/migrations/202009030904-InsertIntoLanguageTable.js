const uuid = require('uuid');

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('languages', [{
        id: uuid.v4(),
        name: "English"
      }]);

      await queryInterface.bulkInsert('languages', [{
        id: uuid.v4(),
        name: "Simplified Chinese"
      }]);

      await queryInterface.bulkInsert('languages', [{
        id: uuid.v4(),
        name: "Traditional Chinese"
      }]);

      await queryInterface.bulkInsert('languages', [{
        id: uuid.v4(),
        name: "French"
      }]);

      await queryInterface.bulkInsert('languages', [{
        id: uuid.v4(),
        name: "Japanese"
      }]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('languages', [
          {name: "English"},
          {name: "Simplified Chinese"},
          {name: "Traditional Chinese"},
          {name: "French"},
          {name: "Japanese"}
        ]);
    }
  };