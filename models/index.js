const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Character = require('./Character')(sequelize, DataTypes);
  const BanStage = require('./BanStage')(sequelize, DataTypes);
  const CounterpickStage = require('./CounterpickStage')(sequelize, DataTypes);
  const Tip = require('./Tip')(sequelize, DataTypes);

  // Relationships
  Character.hasMany(BanStage, { foreignKey: 'characterId', onDelete: 'CASCADE' });
  BanStage.belongsTo(Character, { foreignKey: 'characterId' });

  Character.hasMany(CounterpickStage, { foreignKey: 'characterId', onDelete: 'CASCADE' });
  CounterpickStage.belongsTo(Character, { foreignKey: 'characterId' });

  Character.hasMany(Tip, { foreignKey: 'characterId', onDelete: 'CASCADE' });
  Tip.belongsTo(Character, { foreignKey: 'characterId' });

  return {
    Character,
    BanStage,
    CounterpickStage,
    Tip
  };
};
