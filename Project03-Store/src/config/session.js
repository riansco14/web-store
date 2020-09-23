const { PGStore } = require('connect-pg-simple');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const db = require('./db')

module.exports = session({
    store: new pgSession({
        pool: db
    }), 
    secret: 'markinhos',
    //resave e save tem a ver com criar novas sessoes sempre
    resave: false,
    saveUninitialized: false,
    cookie: {
        //validade do cookie é em milissegundos
        maxAge: 30*24*60*60*1000
    }
})

