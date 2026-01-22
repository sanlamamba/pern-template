const isDev = process.env.NODE_ENV !== 'production';

export const logger = {
  info: (msg: string) => console.log(`[INFO] ${msg}`),
  error: (msg: string, err?: unknown) => console.error(`[ERROR] ${msg}`, err || ''),
  debug: (msg: string) => isDev && console.log(`[DEBUG] ${msg}`),
};
