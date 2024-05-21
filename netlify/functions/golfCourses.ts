import { Handler } from '@netlify/functions';
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const handler: Handler = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    // @ts-expect-error fix
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db('golf-scores');

  const collection: mongoDB.Collection = db.collection('golfCourses');

  const cursor = collection.find();

  const golfCourses = [] as mongoDB.WithId<mongoDB.BSON.Document>[];
  for await (const doc of cursor) {
    golfCourses.push(doc);
  }

  await client.close();

  return {
    statusCode: 200,
    body: JSON.stringify({ golfCourses }),
  };
};

export { handler };
