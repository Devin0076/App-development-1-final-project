// User model for authentication and role-based access

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // each user must have a unique email
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', 
    },
  });

  return User;
};
