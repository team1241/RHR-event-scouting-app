export const DEV_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export const PROD_CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://rebuilt.rhrscouting.ca",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export const isDev = process.env?.NODE_ENV && process.env.NODE_ENV !== 'production'