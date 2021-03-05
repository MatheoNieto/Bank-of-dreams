export interface typesConfigHost {
  dev: boolean
  port: number
  host: string
  cors: any
}

export interface typesConfigDb {
  host_db: string
  port_db: number
  user_db: string
  password_db: string
  database: string
}

export interface typesConfigAuth{
  access_token_secret: string
  refress_token_secret: string
}

export interface typesConfigAmazon{
  accessKeyId: string
  secretAccessKey: string
  region: string
}