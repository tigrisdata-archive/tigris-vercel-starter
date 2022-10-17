import { TigrisDataTypes } from '@tigrisdata/core/dist/types.js'
import dotenv from 'dotenv'
import { Tigris } from '@tigrisdata/core'

const conf = dotenv.config({ path: '.env.development' })
if (conf.error) {
  console.log(`Failed to load config file. Error: ${conf.error.message}`)
  process.exit(1)
}
const inputUrl = process.env.TIGRIS_URI
if (!inputUrl) {
  console.log(`TIGRIS_URI is missing in config`)
  process.exit(1)
}
console.log(`Bootstrapping database and collection at ${inputUrl}....`)

const DB_NAME = 'tigris_vercel_starter'
const COLLECTION_NAME = 'todoItems'
const tigris = new Tigris({ serverUrl: inputUrl, insecureChannel: true })

// setup db
const db = await tigris.createDatabaseIfNotExists(DB_NAME)
console.log(`Created database: ${DB_NAME}`)

// schema definition
const todoItemSchema = {
  id: {
    type: TigrisDataTypes.INT32,
    primary_key: { order: 1, autoGenerate: true }
  },
  text: { type: TigrisDataTypes.STRING },
  completed: { type: TigrisDataTypes.BOOLEAN },
}

// create collection
const collection = await db.createOrUpdateCollection(COLLECTION_NAME,
  todoItemSchema)
console.log(`Created collection: ${COLLECTION_NAME}`)

export const documents = [
  {
    id: 1,
    text: 'Bread',
    completed: false
  },
  {
    id: 2,
    text: 'Pasta',
    completed: false
  },
  {
    id: 3,
    text: 'Cereal',
    completed: false
  }
]
// insert documents
const inserted = await collection.insertMany(documents)
console.log(`Inserted ${inserted.length} documents`)
