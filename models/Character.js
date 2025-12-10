// Character model representing a Smash Ultimate fighter

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true // Each character name must be unique (Need to figure out how to handle the mii fighters)
    },
    archetype: { 
      type: DataTypes.STRING, 
      allowNull: true // General fighter style (all-rounder, zoner, heavyweight, etc.)
    },
    weightClass: { 
      type: DataTypes.STRING, 
      allowNull: true // Light, midweight, heavyweight, etc.
    }
  });

  return Character;
};
