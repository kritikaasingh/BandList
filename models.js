const Sequelize = require('sequelize')
const bcrypt = require('bcrypt-nodejs')

const User = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [0, 100],
                msg: 'Number of character should be less than 50'
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: {
                args: [6, 128],
                msg: "Email address must be between 6 and 128 characters in length"
            },
            isEmail: {
                msg: "Email address must be valid"
            }
        }
    },
    college: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dob: {
        type: Sequelize.DATE,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 6
            }
        }
    }
}, {
    instanceMethods: {
        generateHash: function (password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
        },
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password)
        }
    }
}) 

const Band = db.define('bands', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [0, 100],
                    msg: 'Number of character should be less than 50'
                }
            }
        }
    })
    Band.belongsTo(User); 