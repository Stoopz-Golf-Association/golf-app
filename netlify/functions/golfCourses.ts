import { Handler } from '@netlify/functions';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConnString = process.env.DB_CONN_STRING;

const handler: Handler = async () => {
  const sql = postgres(dbConnString || '', {
    ssl: {
      rejectUnauthorized: false,
    },
  });

  const golfCourses = await sql`
  SELECT golfcourse_id, course_name, par, location FROM golfCourses;
 `;

  return {
    statusCode: 200,
    body: JSON.stringify({ golfCourses }),
  };
};

export { handler };
