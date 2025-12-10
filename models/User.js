// User model for authentication and role-based access

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

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
      allowNull: false, // stores the hashed password
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // default role is regular user
    },
  }, {
    hooks: {
      // Hash password before creating a new user
      beforeCreate: async (user) => {
        if (user.password) {
          const hashed = await bcrypt.hash(user.password, SALT_ROUNDS);
          user.password = hashed;
        }
      },
      // Hash password again if it is changed on update
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const hashed = await bcrypt.hash(user.password, SALT_ROUNDS);
          user.password = hashed;
        }
      }
    }
  });

  // Instance method to check a plain text password against the stored hash
  User.prototype.checkPassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
  };

  return User;
};
