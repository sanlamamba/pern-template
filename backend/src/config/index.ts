export const config = {
  port: Number(process.env.PORT) || 3001,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  isDev: process.env.NODE_ENV !== 'production',
};
