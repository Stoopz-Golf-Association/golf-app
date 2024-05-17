import { Handler } from '@netlify/functions';
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const saltRounds = 10;

const handler: Handler = async (event) => {
  const credentials = JSON.parse(event.body);

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    // @ts-expect-error fix
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db('golf-scores');

  const collection: mongoDB.Collection = db.collection('users');

  // hash password
  //const hashedPassword = bcrypt(JSON.parse(event.body || '').password);
  const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);
  // Store hash in your password DB.

  await collection.insertOne({
    userName: credentials.userName,
    password: hashedPassword,
  });

  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'ok' }),
  };
};

export { handler };
