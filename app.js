require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json());

const userRoute = require('./routes/user');

app.use('/users', userRoute);

app.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status).json({
        con: false,
        msg: err.message
    });
});
app.use('*', (req, res, next) => res.status(200).json({
    msg: "Route not found",
}))
app.listen(process.env.PORT, console.log(`Server is running at PORT ${process.env.PORT}`));