// Stage that a Dark Pit/Pit player should counterpick for matchup advantage

module.exports = (sequelize, DataTypes) => {
  const CounterpickStage = sequelize.define('CounterpickStage', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    stageName: { 
      type: DataTypes.STRING, 
      allowNull: false // Name of the stage to counterpick
    },
    benefit: { 
      type: DataTypes.TEXT, 
      allowNull: false // Explanation of why this stage benefits Dark Pit/Pit
    },
    rating: { 
      type: DataTypes.INTEGER, 
      allowNull: true // Rating of how strong the advantage is
    }
  });

  return CounterpickStage;
};
