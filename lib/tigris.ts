import { Tigris, TigrisClientConfig } from '@tigrisdata/core'

if (!process.env.TIGRIS_URI) {
  throw new Error('TIGRIS_URI env variable is missing in .env.local ')
}

const tigrisUri: string = process.env.TIGRIS_URI as string

declare global {
  var tigrisClient: Tigris
}

let tigris: Tigris
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
  tigris = new Tigris(clientConfig)
} else {
  if (!global.tigrisClient) {
    global.tigrisClient = new Tigris(clientConfig)
  }
  tigris = global.tigrisClient
}

// export to share client across modules
export default tigris

function requiresAuth (inputUrl: string): boolean {
  const isLocalDev: boolean = inputUrl == null ||
    inputUrl === 'undefined' ||
    inputUrl.length === 0 ||
    inputUrl.includes('localhost') ||
    inputUrl.includes('127.0.0.1') ||
    inputUrl.includes('0.0.0.0')

  return !isLocalDev
}
