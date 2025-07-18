const ACCESS_TOKEN_KEY = 'accessToken';

export function getToken(): string {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  return accessToken;
}

export function setToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function deleteToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
