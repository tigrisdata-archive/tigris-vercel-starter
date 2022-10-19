import dotenv from 'dotenv'
import fs from 'fs'
import { COLLECTION_NAME, DB_NAME, TodoItemSchema } from '../lib/schema'
import { Tigris, TigrisClientConfig } from '@tigrisdata/core'

if (process.env.NODE_ENV !== 'production') {
  const configPaths = ['.env.local', '.env.development']
  let configPath = ''

  for (const path of configPaths) {
    if (fs.existsSync(path)) {
      configPath = path
      break
    }
  }

  if (configPath === '') {
    console.log(
      `Provide one of the environment files: '${configPaths}' with similar structure as '.env.example'`)
    process.exit(1)
  }

  const conf = dotenv.config({ path: configPath })
  if (conf.error) {
    console.log(`Failed to load environment file. Error: ${conf.error.message}`)
    process.exit(1)
  }

  console.log(`Loaded environment variables file ${configPath}`)
}

async function main () {
  if (!process.env.TIGRIS_URI) {
    console.log('Cannot find TIGRIS_URI environment variable ')
    process.exit(1)
  }
  // setup client
  const tigrisUri: string = process.env.TIGRIS_URI as string
  const clientConfig: TigrisClientConfig = { serverUrl: tigrisUri }

  if (process.env.TIGRIS_CLIENT_ID) {
    clientConfig.clientId = process.env.TIGRIS_CLIENT_ID as string
  }
  if (process.env.TIGRIS_CLIENT_SECRET) {
    clientConfig.clientSecret = process.env.TIGRIS_CLIENT_SECRET as string
  }
  const tigrisClient = new Tigris(clientConfig)
  console.log(`Using Tigris at ${tigrisUri}`)

  // create DB
  const tigrisDb = await tigrisClient.createDatabaseIfNotExists(DB_NAME)
  console.log(`Created database: ${DB_NAME}`)

  // create collection
  const collection = await tigrisDb.createOrUpdateCollection(COLLECTION_NAME, TodoItemSchema)
  console.log(`Created collection: ${collection.collectionName}`)
}

main()
