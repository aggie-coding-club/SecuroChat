/* userModel.js
 * Defines database schema/model for users table
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    online_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    last_online: {
        type: DataTypes.DATETIME,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'users',
});

module.exports = User;

