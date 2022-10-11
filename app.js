require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fileUpload = require('express-fileupload');

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoute = require('./routes/user');
const tagRoute = require('./routes/tag');
const catRoute = require('./routes/category');
const postRoute = require('./routes/post');

app.use('/users', userRoute);
app.use('/tags', tagRoute);
app.use('/cats', catRoute);
app.use('/posts', postRoute);

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