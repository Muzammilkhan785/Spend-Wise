const app = require('./app.js');
require('./config/db.js');
const PORT = process.env.port || 5000;
app.listen(PORT, () => {
    console.log('==================');
    console.log('SPENDWISE SERVER RUNNING');
    console.log('RUNNING on http://localhost:' + PORT);
    console.log('Enviroment' + process.env.NODE_ENV);
    console.log('==================');
});