import crypto from 'crypto';

export function getAdminToken() {
  const password = process.env.ADMIN_PASSWORD || '';
  return crypto.createHash('sha256').update(password + 'ncr-salt').digest('hex');
}

export function isValidAdminToken(token: string | undefined) {
  if (!token) return false;
  return token === getAdminToken();
}