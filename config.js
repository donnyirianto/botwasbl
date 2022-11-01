require('dotenv').config();

const config = { 
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: 'sembilanbintanglestari.com',
    user: 'k9276765_donny',
    password: 'N3wbi328m3d',
    database: 'k9276765_sbl',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    dateStrings:true,
    multipleStatements: true
  }, 
  dbho: { /* don't expose password or any sensitive info, done only for demo */
    host: process.env.DB_HOST_HO,
    user: process.env.DB_USER_HO,
    password: process.env.DB_PASS_HO,
    database: process.env.DB_NAME_HO,
    port: process.env.DB_PORT_HO,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
    dateStrings:true,
    multipleStatements: true
  },
};

module.exports = config;