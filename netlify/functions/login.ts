import { Handler } from '@netlify/functions';

import postgres from 'postgres';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const dbConnString = process.env.DB_CONN_STRING;
if (!dbConnString) {
  throw new Error('DB_CONN_STRING environment variable is not defined');
}

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
  const sql = postgres(dbConnString || '', {
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    const { userName, password } = credentials;

    if (!userName) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'userName is missing in the request body',
        }),
      };
    }

    const [user] = await sql`
    SELECT * FROM users WHERE username =
     
      (${userName});
   
  `;

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'User not found' }),
      };
    }

    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Password incorrect' }),
      };
    }
    const token = jwt.sign({ userName: user.userName }, process.env.JWT_SECRET);

    return {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: {
        'Set-Cookie': `auth=${token}; path=/`,
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
