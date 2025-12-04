module.exports = (sequelize, DataTypes) => {
  const CounterpickStage = sequelize.define('CounterpickStage', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    stageName: { type: DataTypes.STRING, allowNull: false },
    benefit: { type: DataTypes.TEXT, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: true }
  });

  return CounterpickStage;
};
