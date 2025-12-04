module.exports = (sequelize, DataTypes) => {
  const BanStage = sequelize.define('BanStage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    stageName: { type: DataTypes.STRING, allowNull: false },
    reason: { type: DataTypes.TEXT, allowNull: false },
    dangerRating: { type: DataTypes.INTEGER, allowNull: true } 
  });

  return BanStage;
};
