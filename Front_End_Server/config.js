module.exports = {
    dev: {
        apiUrl: 'http://localhost:',
        port: 2016
    },
    production: {
        apiUrl: process.env.API_URL,
        port: process.env.port
    }
};