const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const transactionsRoute = require('./modules/transactions/transactions.routes.js');
const analyticsRoute = require('./modules/analytics/analytics.routes.js');
const categoriesRoute = require('./modules/categories/categories.routes.js');
const settingsRoute = require('./modules/settings/settings.routes.js');
const ErrorHandler = require('./middleware/errorHandler');
const app = express();
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ success: true, message: 'SpendWise API is running', version: '1.0.0' });
});
app.use('/api/transactions', transactionsRoute);
app.use('/api/analytics', analyticsRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/settings', settingsRoute);
app.use('/api/health', (req, res) => {
    res.json({ success: true, message: 'SpendWise is healthy and running', timestamp: Date.now() });
});
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route ' + req.originalUrl + ' Not Found' });
});
app.use(ErrorHandler);
module.exports = app;