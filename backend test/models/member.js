"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models.Borrow, { foreignKey: "memberId" });
    }
  }
  Member.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      penalty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      limitPenalty: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
