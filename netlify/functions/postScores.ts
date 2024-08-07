import { Handler } from '@netlify/functions';

import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConnString = process.env.DB_CONN_STRING;

const handler: Handler = async (event) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: Missing event body' }),
    };
  }

  const scores = JSON.parse(event.body);
  const sql = postgres(dbConnString || '', {
    ssl: {
      rejectUnauthorized: false,
    },
  });
  console.log(event);

  for await (const score of scores) {
    await sql`
    INSERT INTO golfscores (player, score, golfcourse_id, date)
    values
  (${score.player}, ${score.score},  ${score.golfCourseId}, ${score.date})
   `;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'ok' }),
  };
};

export { handler };
