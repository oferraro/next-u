const { faker } = require('@faker-js/faker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentTime = Sequelize.fn('NOW');

    for (let i = 0; i < 100; i++) {
      await queryInterface.bulkInsert('Products', [{
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        createdAt: currentTime,
        updatedAt: currentTime
      }], {});
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
