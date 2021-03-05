import Auth from '../components/auth/network'
import Client from '../components/client/network'
import Product from '../components/product/network'
import PetitionsProducts from '../components/petitionsProducts/network'

// migrate info default
import migrateTypesProducts from '../components/utils/migrateTypesProducts'

const routes = (server: any) => {
  server.use('/auth', Auth)
  server.use('/client', Client)
  server.use('/product', Product)
  server.use('/petition-product', PetitionsProducts)

  // migrate somethings types products
  server.use('/migratetypesproducts', migrateTypesProducts)

}

export default routes