import Auth from '../components/auth/network'


const routes = (server: any) => {
  server.use('/auth', Auth)
}

export default routes