const USE_PROD = true;

export const url = USE_PROD
  ? 'https://tot-fet-backend-production.up.railway.app'
  : 'http://localhost:3000';

export const TIME_TO_REFRESH = 1000 * 60 * 60; // 1 hour
