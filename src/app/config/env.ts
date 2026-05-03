import dotenv from "dotenv";

dotenv.config();



interface IEnvVars {
  DB_Url: string;
  port: string;
  node_env: string;
  DB_USER:string;
  DB_PASS:string
}

const loadEnvVars = (): IEnvVars => {
  const requiredEnvVars: string[] = ["port", "DB_Url", "node_env","DB_USER","DB_PASS"];

  requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    port: process.env.port as string,
    DB_Url: process.env.DB_URL!,
    node_env: process.env.node_env as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASS: process.env.DB_PASS as string
  };
};

export const envVars = loadEnvVars()
