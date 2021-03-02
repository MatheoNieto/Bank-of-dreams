import Auth from '../components/auth/network'
import Client from '../components/client/network'
import Product from '../components/product/network'

const routes = (server: any) => {
  server.use('/auth', Auth)
  server.use('/client', Client)
  server.use('/product', Product)
}

export default routes