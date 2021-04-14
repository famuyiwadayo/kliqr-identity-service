import dotenv from "dotenv";
dotenv.config();

export const config = {
  DB_URI: process.env.DATABASE_URL as string,
  PORT: process.env.PORT as string | number,
  NAME: process.env.NAME as string,
  VERSION: process.env.VERSION as string,
  SERVICE_REGISTRY_URI: process.env.SERVICE_REGISTRY_URI as string,
};
