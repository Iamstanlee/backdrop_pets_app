import {Dog, IStorage} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVOURITE_STORAGE_KEY = 'FAVOURITE_STORAGE_KEY';

export const StorageImpl: IStorage<Dog> = {
  get: async () => {
    const items = await AsyncStorage.getItem(FAVOURITE_STORAGE_KEY);
    if (items) return JSON.parse(items) as Dog[];
    return [];
  },
  saveItem: async item => {
    const items = await StorageImpl.get();
    await AsyncStorage.setItem(
      FAVOURITE_STORAGE_KEY,
      JSON.stringify([...items, item]),
    );
  },
  clear: () => AsyncStorage.clear(),
};
