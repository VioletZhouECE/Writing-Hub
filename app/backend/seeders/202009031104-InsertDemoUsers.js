const uuid = require("uuid");

module.exports = {
    //create 4 TestUsers for version I development
    up: async (queryInterface, Sequelize) => {
      let EnglishId = await queryInterface.sequelize.query(
        `SELECT id from languages WHERE name = "English";`
      );
      EnglishId = EnglishId[0][0].id;

      let SChineseId = await queryInterface.sequelize.query(
        `SELECT id from languages WHERE name = "Simplified Chinese";`
      );
      SChineseId = SChineseId[0][0].id;

      let JapaneseId = await queryInterface.sequelize.query(
        `SELECT id from languages WHERE name = "Japanese";`
      );
      JapaneseId = JapaneseId[0][0].id;

      await queryInterface.bulkInsert('users', [
        {id: uuid.v4(), username: "TestUser1", password: "123456"},
        {id: uuid.v4(), username: "TestUser2", password: "234567"},
        {id: uuid.v4(), username: "TestUser3", password: "345678"},
        {id: uuid.v4(), username: "TestUser4", password: "456789"}
      ]);


      let resultArray;
      const demoUserId = [];
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser1";`);
      demoUserId.push(resultArray[0][0].id);
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser2";`);
      demoUserId.push(resultArray[0][0].id);
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser3";`);
      demoUserId.push(resultArray[0][0].id);
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser4";`);
      demoUserId.push(resultArray[0][0].id);

      await queryInterface.bulkInsert('firstLanguageUsers', [
        {UserId: demoUserId[0], LanguageId: SChineseId},
        {UserId: demoUserId[1], LanguageId: SChineseId},
        {UserId: demoUserId[2], LanguageId: EnglishId},
        {UserId: demoUserId[3], LanguageId: JapaneseId}
      ]);

      return await queryInterface.bulkInsert('learnLanguageUsers', [
        {UserId: demoUserId[0], LanguageId: EnglishId},
        {UserId: demoUserId[1], LanguageId: EnglishId},
        {UserId: demoUserId[2], LanguageId: SChineseId},
        {UserId: demoUserId[3], LanguageId: EnglishId}
      ]);
    },
    down: async (queryInterface, Sequelize) => {
      let resultArray;
      const demoUserId = [];
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser1";`);
      demoUserId.push(resultArray[0][0].id);
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser2";`);
      demoUserId.push(resultArray[0][0].id);
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser3";`);
      demoUserId.push(resultArray[0][0].id);
      resultArray = await queryInterface.sequelize.query(`SELECT id from users WHERE username = "TestUser4";`);
      demoUserId.push(resultArray[0][0].id);

      const Op = Sequelize.Op; 
      
      await queryInterface.bulkDelete('firstLanguageUsers', [
        {[Op.or]: [{UserId: demoUserId[0]}, {UserId: demoUserId[1]}, {UserId: demoUserId[2]}, {UserId: demoUserId[3]}]}
      ]);

      await queryInterface.bulkDelete('learnLanguageUsers', [
        {[Op.or]: [{UserId: demoUserId[0]}, {UserId: demoUserId[1]}, {UserId: demoUserId[2]}, {UserId: demoUserId[3]}]}
      ]);
      
      return await queryInterface.bulkDelete('users', [
        {[Op.or]: [{id: demoUserId[0]}, {id: demoUserId[1]}, {id: demoUserId[2]}, {id: demoUserId[3]}]}
      ]);
    }
  };