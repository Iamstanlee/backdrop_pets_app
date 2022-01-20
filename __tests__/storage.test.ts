import AsyncStorage from '../__mocks__/@react-native-async-storage/async-storage';
import {Dog} from '../src/types';
import {StorageImpl} from '../src/storage';

beforeEach(async () => {
  StorageImpl.clear();
});

afterAll(async () => {
  StorageImpl.clear();
});

const dog: Dog = {
  name: '_Dog',
  id: '_id',
  image: {url: '_url', height: 0, width: 0, id: '_id'},
};

it('should add item to favourite storage', async () => {
  await StorageImpl.saveItem(dog);
  expect(AsyncStorage.setItem).toBeCalled();
});

it('should return empty array when no item is in storage', async () => {
  const items = await StorageImpl.get();
  expect(items).toEqual([]);
});

it('should return equal length of items saved', async () => {
  const length = 10;
  for (let i = 0; i < length; i++) await StorageImpl.saveItem(dog);
  const items = await StorageImpl.get();
  expect(items.length).toEqual(length);
});
