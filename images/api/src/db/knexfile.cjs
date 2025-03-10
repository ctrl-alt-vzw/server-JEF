
const con = {
    client: 'pg',
    connection: {

      host: process.env.POSTGRES_HOST,
      user:  process.env.POSTGRES_USER,
      password:  process.env.POSTGRES_PASSWORD,
      database:  process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './migrations/',
    },
    seeds: {
      directory: './seeds/',
    },
  
};
// console.log('Loaded Knex Configuration:', con);

module.exports = con