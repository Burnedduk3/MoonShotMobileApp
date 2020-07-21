import { useState } from 'react';

export const useRestaurant = () => {
  const [restaurant, setRestaurant] = useState({});

  return [
    restaurant,
    (e) => {
      setRestaurant({
        ...restaurant,
        ...e,
      });
    },
  ];
};
