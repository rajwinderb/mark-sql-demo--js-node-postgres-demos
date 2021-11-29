const { Client } = require("pg");

//This line will read in any MY_KEY=myValue pairs in your .env file and
// make them available as environment variables as properties of process.env
// Example: if the file has
// MY_KEY=myValue
// we'd be able to access process.env.MY_KEY
// Specifically, you should provide a DB connection string as DATABASE_URL in .env
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  throw "No DATABASE_URL env var!  Have you made a .env file?  And set up dotenv?";
}
const herokuSSLSetting = { rejectUnauthorized: false };
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting;
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

async function doDemo() {
  // To connect to a heroku db you need to specify an object value for the ssl option
  // (however, if you want to connect to a local db you should set this property to false).
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  //Change the table name to match one in your heroku database!
  const result = await client.query("SELECT *  FROM words;");
  for (let row of result.rows) {
    console.log(row);
  }
  client.end();
}

doDemo();
