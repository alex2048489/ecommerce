"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Brands", [
      {
        name: "Apple",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/brand-img%2Fapple.png?alt=media&token=b235a7e3-22a7-4d4d-8db2-ad7f51e098b0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Acer",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/brand-img%2Facer.png?alt=media&token=dd5fbdee-3875-4228-893a-90c9ec5e2a00",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Dell",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/brand-img%2Fdell.png?alt=media&token=3c718aa5-a5c5-42c2-a725-8f8737e2d200",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Xiaomi",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/brand-img%2Fxiaomi.png?alt=media&token=1df5164e-3331-49ff-a7aa-864bd2cf68b7",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Brands", null, {});
  },
};
