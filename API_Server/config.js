module.exports = {
    dev:{
        connectionString: 'postgresql://postgres:docker@127.0.0.1:5432/scp_mvp',
        port: '2016'
    },
    production:{
        connectionString: process.env.POSTGRES_CONNECTION_STRING + '?ssl=true',
        port: process.env.PORT
    }
};