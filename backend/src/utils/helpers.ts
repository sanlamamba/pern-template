export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const randomId = () => Math.random().toString(36).slice(2);
