import { DB, Tigris, TigrisClientConfig } from '@tigrisdata/core'

if (!process.env.TIGRIS_URI) {
  throw new Error('Cannot find TIGRIS_URI environment variable ')
}
if (!process.env.TIGRIS_DB) {
  throw new Error('Cannot find TIGRIS_DB environment variable ')
}
if (!process.env.TIGRIS_COLLECTION) {
  throw new Error('Cannot find TIGRIS_COLLECTION environment variable ')
}

const tigrisUri: string = process.env.TIGRIS_URI as string
const DB_NAME: string = process.env.TIGRIS_DB as string
export const COLLECTION_NAME: string = process.env.TIGRIS_COLLECTION as string
let tigrisDb: DB
let clientConfig: TigrisClientConfig

if (process.env.NODE_ENV === 'production' || requiresAuth(tigrisUri)) {
  if (!process.env.TIGRIS_CLIENT_ID || !process.env.TIGRIS_CLIENT_SECRET) {
    throw new Error(
      'Cannot find TIGRIS_CLIENT_ID or TIGRIS_CLIENT_SECRET environment variables')
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

function requiresAuth (inputUrl: string): boolean {
  const isLocalDev: boolean = inputUrl == null ||
    inputUrl === 'undefined' ||
    inputUrl.length === 0 ||
    inputUrl.includes('localhost') ||
    inputUrl.includes('127.0.0.1') ||
    inputUrl.includes('0.0.0.0')
  return !isLocalDev
}

const client = new Tigris(clientConfig)
// export to share database across modules
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default tigrisDb = client.getDatabase(DB_NAME)
