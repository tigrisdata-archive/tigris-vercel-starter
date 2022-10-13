import { Tigris, TigrisClientConfig } from '@tigrisdata/core'

if (!process.env.TIGRIS_HOST) {
  throw new Error('Please add TIGRIS_HOST env variable to .env.local')
}

let tigris: Tigris
const tigrisHost: string = process.env.TIGRIS_HOST as string
const clientConfig: TigrisClientConfig = getClientConfig(tigrisHost)

function getClientConfig (inputUrl: string): TigrisClientConfig {
  const noAuthRequired: boolean = inputUrl == null ||
    inputUrl === 'undefined' ||
    inputUrl.length === 0 ||
    inputUrl.includes('localhost') ||
    inputUrl.includes('127.0.0.1') ||
    inputUrl.includes('0.0.0.0')

  if (noAuthRequired) {
    return { serverUrl: inputUrl, insecureChannel: true }
  } else {
    throw new Error('auth setup not implemented')
  }
}

declare global {
  var tigrisClient: Tigris
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

