import mysql2 from "mysql2"; // Needed to fix sequelize issues with WebPack

export default {
  development: {
    username: "uztnf0ppw2uklml6",
    password: "DSrbsHEVxuPwQdq6GwH8",
    database: "b8gv9mcbebmlxny0wlsw",
    host: "b8gv9mcbebmlxny0wlsw-mysql.services.clever-cloud.com",
    port: "3306",
    dialect: "mysql",
    dialectModule: mysql2,
  },
  test: {
    username: "root",
    password: null,
    database: "full_ecommerce",
    host: "127.0.0.1",
    dialect: "mysql",
    dialectModule: mysql2,
  },
  production: {
    username: "uknk8yufzduruwtb",
    password: "FApN8CwpIxyKCmLaTYKt",
    database: "bvrl6sae6blvxptr63kn",
    host: "bvrl6sae6blvxptr63kn-mysql.services.clever-cloud.com",
    port: "3306",
    dialect: "mysql",
  },
};
