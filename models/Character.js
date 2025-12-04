module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    archetype: { type: DataTypes.STRING, allowNull: true },
    weightClass: { type: DataTypes.STRING, allowNull: true }
  });

  return Character;
};
