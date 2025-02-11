'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                email: 'hoan@gmail.com',
                password: '$2b$10$Wx2aBFcaMSu5ipt7g88YKezGvBqFPdAfNQjN4ixHozfCOyHxAjDh2',
                name: 'Do Hoan',
                role: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
