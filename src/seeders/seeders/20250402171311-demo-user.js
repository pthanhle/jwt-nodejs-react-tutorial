'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
    await queryInterface.bulkInsert('Users', [
      {
        email: '22110228@student.hcmute.edu.vn',
        password: '123456',
        username: 'PhTh',
      },
      {
        email: '22110228@student.hcmute.edu.vn',
        password: '123456',
        username: 'PhTh1',
      },
      {
        email: '22110228@student.hcmute.edu.vn',
        password: '123456',
        username: 'PhTh2',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
