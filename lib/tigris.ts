import { DB, Tigris, TigrisClientConfig } from '@tigrisdata/core'

if (!process.env.TIGRIS_URI) {
  throw new Error('TIGRIS_URI env variable is missing in .env.local ')
}

const tigrisUri: string = process.env.TIGRIS_URI as string

declare global {
   // eslint-disable-next-line no-var
  var tigrisDb: DB
}

const DB_NAME = 'tigris_vercel_starter'
let tigrisDb: DB
let clientConfig: TigrisClientConfig

if (process.env.NODE_ENV === 'production' || requiresAuth(tigrisUri)) {
  if (!process.env.TIGRIS_CLIENT_ID || !process.env.TIGRIS_CLIENT_SECRET) {
    throw new Error(
      'TIGRIS_CLIENT_ID and TIGRIS_CLIENT_SECRET missing in .env.local')
  }
  const clientId = process.env.TIGRIS_CLIENT_ID as string
  const clientSecret = process.env.TIGRIS_CLIENT_SECRET as string
  clientConfig = {
    serverUrl: tigrisUri,
    clientId: clientId,
    clientSecret: clientSecret
  }
} else {
  clientConfig = { serverUrl: tigrisUri, insecureChannel: true }
}

// TigrisClient can be global to re-use connections in development
if (process.env.NODE_ENV === 'production') {
  const client = new Tigris(clientConfig)
  tigrisDb = client.getDatabase(DB_NAME)
} else {
  if (!global.tigrisDb) {
    const client = new Tigris(clientConfig)
    global.tigrisDb = client.getDatabase(DB_NAME)
  }
  tigrisDb = global.tigrisDb
}

// export to share database across modules
export default tigrisDb
export const COLLECTION_NAME = 'todoItems'

function requiresAuth (inputUrl: string): boolean {
  const isLocalDev: boolean = inputUrl == null ||
    inputUrl === 'undefined' ||
    inputUrl.length === 0 ||
    inputUrl.includes('localhost') ||
    inputUrl.includes('127.0.0.1') ||
    inputUrl.includes('0.0.0.0')

  return !isLocalDev
}
