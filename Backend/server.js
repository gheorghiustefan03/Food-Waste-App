require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routers');
const cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:5173',
credentials: true }));

app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}`);
});