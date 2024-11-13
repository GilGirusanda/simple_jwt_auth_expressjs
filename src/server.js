import express from 'express';
import usersController from './entities/users/users.routes.js';
import authController from './entities/auth/auth.routes.js';
import { Sequelize } from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import User from './entities/users/users.models.js';
import { insertUserData } from './utils/users.data.insert.js';
import { verifyToken } from './entities/auth/auth.middleware.js';
import dotenv from 'dotenv';
dotenv.config();
  
// Init app
const app = express();
const PORT = Number.parseInt(process.env.PORT) || 4200;

// General middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: process.env.DB_NAME,
    pool: { max: 1, idle: Infinity, maxUses: Infinity },
    models: [User]
});

sequelize
    .sync({ alter: true })
    .then(async () => { 
        const foundUsers = await User.findAll();
        if (foundUsers.length === 0) {
           insertUserData();
           console.info(`Test data has been inserted!`);
        }
        else
           console.info(`Amount of user records: ${foundUsers.length}`);
    })
    .catch(e => console.error(e))

// Public routes
app.get('/', (req, res) => {
    res.json({ 'msg': 'Hello World!' });
});
app.use('/api/v1/auth', authController);

// Private routes
app.use('/api/v1/users', verifyToken, usersController);

// Guard routes
app.use((req, res, next) => {
    console.log(`Guard route!`);
    const err = new Error();
    err.message = 'Route not found';
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status
        }
    });
});

app.listen(PORT, () => {
    console.info(`Magic is happening on port ${PORT}`);
});
