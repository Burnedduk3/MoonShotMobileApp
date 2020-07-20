import { useState } from 'react';

export const useTokens = () => {
  const [tokens, setTokens] = useState({ accessToken: '', refreshToken: '' });

  return [
    tokens,
    (e) => {
      setTokens({
        ...tokens,
        ...e,
      });
    },
  ];
};

export const useUser = () => {
  const [user, setUser] = useState({});

  return [
    user,
    (e) => {
      setUser({
        ...user,
        ...e,
      });
    },
  ];
};
