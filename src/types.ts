export interface IStorage<T> {
  get: () => Promise<T[]>;
  saveItem: (value: T) => void;
  clear: () => void;
}

type DogImage = {
  url?: string;
  id: string;
  height: number;
  width: number;
};

export type Dog = {
  id: string;
  name: string;
  image: DogImage;
  isFavourite?: boolean;
};
