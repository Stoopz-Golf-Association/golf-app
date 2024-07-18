import { Handler } from '@netlify/functions';
import postgres from 'postgres';
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

  try {
    const sql = postgres(process.env.DB_CONN_STRING || '', {
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const hashedPassword = await bcrypt.hash(credentials.password, saltRounds);

    await sql`
      insert into users
        (username, password)
      values
        (${credentials.userName}, ${hashedPassword})
      returning username, password
    `;

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
  }
};

export { handler };
