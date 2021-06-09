import { useCallback, useState, useEffect } from 'react';

let logoutTimer;

const useAuth = () => {
    const [token, setToken] = useState(false);
  const [loggedInUserId, setloggedInUserId] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setloggedInUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 50 * 60);

    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem('userData', JSON.stringify({
      userId: uid,
      token: token,
      expirationDate: tokenExpirationDate.toISOString()
    }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setloggedInUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData
      && storedData.token
      && new Date(storedData.expirationDate) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expirationDate));
    }
  }, [login]);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);


  return {token, login, logout, loggedInUserId};
}

export default useAuth;