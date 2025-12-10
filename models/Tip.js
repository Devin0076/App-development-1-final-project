// General matchup tips for playing Pit or Dark Pit against a specific character

module.exports = (sequelize, DataTypes) => {
  const Tip = sequelize.define('Tip', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    tipTitle: { 
      type: DataTypes.STRING, 
      allowNull: false // Short title summarizing the tip
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: false // Detailed explanation of the strategy or advice
    },
    difficultyLevel: { 
      type: DataTypes.STRING, 
      allowNull: true // Difficulty rating of either 'easy', 'intermediate', 'hard'
    }
  });

  return Tip;
};
