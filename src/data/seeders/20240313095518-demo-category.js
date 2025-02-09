'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Categories', [
            {
                name: 'Laptop',
                image: 'https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/category-img%2Fcategory-img%2Flaptop-asus.png?alt=media&token=a52c0d3e-c1f9-450e-99da-80341a46f0ed',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Categories', null, {});
    },
};
