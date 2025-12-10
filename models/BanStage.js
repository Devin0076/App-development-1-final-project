// Stage that a Dark Pit/Pit player should ban in a matchup

module.exports = (sequelize, DataTypes) => {
  const BanStage = sequelize.define('BanStage', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    stageName: { 
      type: DataTypes.STRING, 
      allowNull: false // Name of the stage to ban
    },
    reason: { 
      type: DataTypes.TEXT, 
      allowNull: false // Explanation for why this stage is bad for Dark Pit/Pit 
    },
    dangerRating: { 
      type: DataTypes.INTEGER, 
      allowNull: true // Rating of how dangerous the stage is
    }
  });

  return BanStage;
};
