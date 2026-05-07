
import "dotenv/config" 
import { cleanEnv, str,num } from 'envalid'

export const envVars = cleanEnv(process.env, {
  port: num(),
  DB_Url: str(),
  node_env: str(),
  secret: str(),
  refresh_secret:str(),
  expiresIn:str(),
  refresh_expiresIn:str(),
  becrypt_salt_round:str()
})

