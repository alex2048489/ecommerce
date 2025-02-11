const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // define association here
      News.hasMany(models.News_detail, {
        foreignKey: "news_id",
      });
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.TEXT,
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  News.sync();
  return News;
};
