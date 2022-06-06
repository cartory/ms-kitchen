const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sqlite::memory', {
    logging: false,
    define: {
        paranoid: true,
        defaultScope: {
            attributes: {
                exclude: [
                    'createdAt', 'updatedAt', 'deletedAt'
                ]
            }
        }
    },
})

module.exports = sequelize