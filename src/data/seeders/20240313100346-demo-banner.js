"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Banners", [
      {
        name: "Iphone 14 Series",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/banner-img%2Fbanner1.webp?alt=media&token=acb02ff0-f1e5-432b-b951-f86f21fef666",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Màn hình chính hãng",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/banner-img%2Fbanner_slide_4_b4d3c996f3e64796b83e224fd13f0479.jpg?alt=media&token=9a2df309-4a0b-4159-892b-ac95eae07d14",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "ROG Zephyrus G14",
        image:
          "https://firebasestorage.googleapis.com/v0/b/full-ecommerce-d7ff7.appspot.com/o/banner-img%2Fgearvn_800x400_rog_86e915f416414660bd9e38091e622d27.jpg?alt=media&token=9e6b09a6-f975-4a34-80f6-b2c54633949e",
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Banners", null, {});
  },
};
