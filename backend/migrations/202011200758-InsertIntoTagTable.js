const uuid = require('uuid');

"grammar", "word choice", "translate", "general opinion", "writing tips"

module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('tags', [{
        id: uuid.v4(),
        name: "grammar"
      }]);

      await queryInterface.bulkInsert('tags', [{
        id: uuid.v4(),
        name: "word choice"
      }]);

      await queryInterface.bulkInsert('tags', [{
        id: uuid.v4(),
        name: "translate"
      }]);

      await queryInterface.bulkInsert('tags', [{
        id: uuid.v4(),
        name: "general opinion"
      }]);

      await queryInterface.bulkInsert('tags', [{
        id: uuid.v4(),
        name: "writing tips"
      }]);
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('tags', [
          {name: "grammar"},
          {name: "word choice"},
          {name: "translate"},
          {name: "general opinion"},
          {name: "writing tips"}
        ]);
    }
  };