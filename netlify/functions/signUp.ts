import { Handler } from '@netlify/functions';
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const saltRounds = 10;

const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Missing event body' }),
    };
  }

  let credentials;
  try {
    credentials = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Invalid JSON' }),
    };
  }

  if (!credentials.userName || !credentials.password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Bad Request: Missing username or password',
      }),
    };
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING || ''
  );

  try {
    await client.connect();
    const db: mongoDB.Db = client.db('golf-scores');
    const collection: mongoDB.Collection = db.collection('users');

    const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);

    await collection.insertOne({
      userName: credentials.userName,
      password: hashedPassword,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User registered successfully' }),
    };
  } catch (error) {
    console.error('Error connecting to the database or inserting user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  } finally {
    await client.close();
  }
};

export { handler };
