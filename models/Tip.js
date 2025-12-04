module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    tipTitle: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    difficultyLevel: { type: DataTypes.STRING, allowNull: true }
  });

  return Tip;
};
