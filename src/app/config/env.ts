
import "dotenv/config" 
import { cleanEnv, str,num } from 'envalid'

export const envVars = cleanEnv(process.env, {
  port: num(),
  DB_Url: str(),
})

