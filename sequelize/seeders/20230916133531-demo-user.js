'use strict';

const { sequelize, Sequelize } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentTime = Sequelize.fn('NOW');

    await queryInterface.bulkInsert('users', [{
      username: 'johngalt',
      first_name: 'John',
      last_name: 'Galt',
      email: 'john@galt.com',
      password: 'apassword',
      user_type: 2, // Admin user
      created_at: currentTime,
      updated_at: currentTime,
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
