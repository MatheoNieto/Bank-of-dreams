import 'reflect-metadata'
import { startServer } from './app'
import { configHost } from './config/settings'

export async function main(){
  const app = await startServer()
  app.listen(configHost.port, () => {
    console.log("express server started 🚀");
  })
}

main()
