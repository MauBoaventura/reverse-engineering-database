const forest = require('forest-express-sequelize');
const Sequelize = require('sequelize');
// Learn how to retrieve your connection here https://docs.forestadmin.com/documentation/reference-guide/how-it-works/developing-on-forest-admin/express-packages#configure-forestadmin
const connection = new Sequelize('controledevendas', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

console.log('AA')

forest.init({
 envSecret: process.env.FOREST_ENV_SECRET||'d418ca0f582af176af72d9e229a29b23ff0d4a93aa4d292d0f6029749ba4730e',
 authSecret: process.env.FOREST_AUTH_SECRET||'7e8826974b0d973ee9b6def02cd4ac06a9fb257fd675f5c6',
 objectMapping: Sequelize,
    connections: { default: connection },
}).then((FAMiddleware) => {
 app.use(FAMiddleware);
});