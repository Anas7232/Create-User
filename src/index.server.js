const express = require('express');
const app = express();
const env = require('dotenv');
const dbConnect = require('./config/dbConfig');
const { notFound, errorHandler } = require('./middleware/error');
const cookieParser = require('cookie-parser');

const userRouter = require('././routes/user')

env.config();
app.use(cookieParser());
app.use(express.json());
dbConnect();
app.use('/api/user', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`App Runing On Port ${process.env.PORT}`)
})