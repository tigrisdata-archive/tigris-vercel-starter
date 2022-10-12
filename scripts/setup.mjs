import { TigrisDataTypes } from '@tigrisdata/core/dist/types.js'
import { Tigris } from '@tigrisdata/core'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local'});
const inputUrl = process.env.TIGRIS_HOST;
console.log(`Bootstrapping database and collection at ${inputUrl}....`)

const DB_NAME = "helloTigris";
const COLLECTION_NAME = "taskLists";
const tigris = new Tigris({ serverUrl: inputUrl, insecureChannel: true });

// setup db
const db = await tigris.createDatabaseIfNotExists(DB_NAME);
console.log(`Created database: ${DB_NAME}`)

// schema definition
const taskListSchema = {
  id: {
    type: TigrisDataTypes.INT32,
    primary_key: {order: 1, autoGenerate: true}
  },
  name: {type: TigrisDataTypes.STRING},
  items: {type: TigrisDataTypes.STRING},
  tags: {type: TigrisDataTypes.STRING},
};

// create collection
const collection = await db.createOrUpdateCollection(COLLECTION_NAME, taskListSchema);
console.log(`Created collection: ${COLLECTION_NAME}`)

export const documents = [
  {
    id: 1,
    name: "Grocery list 10/12",
    items: "bread, pasta, cereal, coffee",
    tags: "shopping, money"
  },
  {
    id: 2,
    name: "School supplies",
    items: "paint kit, marker, index cards, notebooks, colored pencils, scissors",
    tags: "shopping, kids"
  },
  {
    id: 3,
    name: "Spring cleaning",
    items: "backyard trim, replace bulbs, sweep porch, fix microwave",
    tags: "household"
  }
];
// insert documents
const inserted = await collection.insertMany(documents);
console.log(`Inserted ${inserted.length} documents`);
