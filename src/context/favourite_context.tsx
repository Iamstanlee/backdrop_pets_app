import React, {createContext, useContext, useEffect, useState} from 'react';
import {StorageImpl} from '../storage';
import {Dog} from '../types';

const FavouriteContext = createContext<Partial<Props>>({});

export type Props = {
  favourite: Dog[];
  addLiked?: (value: Dog) => void;
  getLiked?: () => void;
};

export const FavouriteContextProvider: React.FC = ({children}) => {
  const [favourite, setFavourite] = useState<Dog[]>();

  useEffect(() => {
    getLiked();
  }, []);

  const getLiked = async () => {
    const liked = await StorageImpl.get();
    setFavourite(liked);
  };

  const addLiked = (liked: Dog) => {
    if (favourite) {
      if (!favourite?.find(dog => dog.id === liked.id)) {
        StorageImpl.saveItem(liked);
        setFavourite(favourite => [...favourite!, liked]);
      }
    }
  };

  return (
    <FavouriteContext.Provider
      value={{favourite: favourite, addLiked: addLiked, getLiked: getLiked}}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavouriteContext = () => {
  const context = useContext(FavouriteContext);
  if (!context)
    throw new Error(
      'FavouriteContext must be used under a FavouriteContextProvider',
    );
  return context;
};
