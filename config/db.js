import Sequelize from 'sequelize';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './preconfigs.js';

// Variables de entorno
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const db = new Sequelize(process.env.DB_NAME || DB_NAME, process.env.DB_USER || DB_USER, process.env.DB_PASS || DB_PASS, {
    host: process.env.DB_HOST || DB_HOST,
    port: process.env.DB_PORT || DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

const Blacklist = db.define('blacklist', {
    ip:{
        type: Sequelize.STRING
    },
    extra_info:{
        type: Sequelize.STRING,
        allowNull: true
    },
}, { freezeTableName: true})


export {db, Blacklist};