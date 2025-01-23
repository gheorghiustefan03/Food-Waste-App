require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routers');
const cookieParser = require('cookie-parser')
const cors = require('cors');

app.use(cors({ origin: ['https://delightful-desert-0b4da3703.4.azurestaticapps.net', 'http://localhost:5173'],
credentials: true }));

const port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
    console.log(`Server running at ${process.env.PROTOCOL}://${process.env.HOST}:${port}`);
});