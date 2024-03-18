const pg = require('pg');
const express = require('express');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_ice_cream_shop_db');
const app = express();

const init = async()=> {
  console.log('connecting to database');
  await client.connect();
  console.log('connected to database');
  let SQL=`
    DROP TABLE IF EXISTS flavor;
    CREATE TABLE flavor(
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    is_favorite BOOLEAN,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
    );
  `;
  await client.query(SQL);
  console.log('tables created');

  SQL=`
      INSERT INTO flavor(name, is_favorite) VALUES ('mint chocolate chip', TRUE);
      INSERT INTO flavor(name, is_favorite) VALUES ('chocolate chip cookie dough', FALSE);
      INSERT INTO flavor(name, is_favorite) VALUES ('butter pecan', FALSE);
  `;
  await client.query(SQL);
  console.log('data seeded');

};
init();