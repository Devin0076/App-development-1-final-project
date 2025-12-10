// Initializes all Sequelize models and sets up their relationships

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Load each model and pass Sequelize + DataTypes
  const Character = require('./Character')(sequelize, DataTypes);
  const BanStage = require('./BanStage')(sequelize, DataTypes);
  const CounterpickStage = require('./CounterpickStage')(sequelize, DataTypes);
  const Tip = require('./Tip')(sequelize, DataTypes);
  const User = require('./User')(sequelize, DataTypes);


  // Define relationships between models

  // A character can have multiple banned stages
  Character.hasMany(BanStage, { foreignKey: 'characterId', onDelete: 'CASCADE' });
  BanStage.belongsTo(Character, { foreignKey: 'characterId' });

  // A character can have multiple counterpick stages
  Character.hasMany(CounterpickStage, { foreignKey: 'characterId', onDelete: 'CASCADE' });
  CounterpickStage.belongsTo(Character, { foreignKey: 'characterId' });

  // A character can have many matchup tips
  Character.hasMany(Tip, { foreignKey: 'characterId', onDelete: 'CASCADE' });
  Tip.belongsTo(Character, { foreignKey: 'characterId' });

  // Export all initialized models
  return {
    Character,
    BanStage,
    CounterpickStage,
    Tip,
    User
  };
};
