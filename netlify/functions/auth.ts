import { Handler } from '@netlify/functions';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import setCookie from 'set-cookie-parser';

dotenv.config();

const handler: Handler = async (event) => {
  const cookies = setCookie.parse(event.headers.cookie, { map: true });
  try {
    try {
      const user = await jwt.verify(cookies.auth.value, process.env.JWT_SECRET);

      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    } catch {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
