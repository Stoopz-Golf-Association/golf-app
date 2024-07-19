import { Handler } from '@netlify/functions';
// import * as mongoDB from "mongodb";
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

  const scores = await sql`
  
SELECT 
    player, 
    score, 
    par, 
    location,
    course_name,
    golfscores.golfcourse_id 
FROM 
    golfscores 
INNER JOIN 
    golfcourses 
ON 
    golfscores.golfcourse_id = golfcourses.golfcourse_id;
`;
  console.log(scores);

  return {
    statusCode: 200,
    body: JSON.stringify({ scores: scores }),
  };
};

export { handler };
