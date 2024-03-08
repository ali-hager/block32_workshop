const pg = require('pg');
const express = require('express');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_ice_cream_shop_db');
const app = express();

const init = async()=> {
  await client.connect();
  console.log('connected to database');
};
init();