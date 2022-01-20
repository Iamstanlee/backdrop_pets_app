import React from 'react';
import {
  FavouriteContextProvider,
  Props,
  useFavouriteContext,
} from '../../src/context/favourite_context';
import {renderHook, act, RenderResult} from '@testing-library/react-hooks';
import {mockDog} from '../../__mocks__/mock_data';

const wrapper: React.FC = ({children}) => (
  <FavouriteContextProvider>{children}</FavouriteContextProvider>
);

let result: RenderResult<Partial<Props>>,
  waitForNextUpdate: (options?: {timeout?: number | false}) => Promise<void>;

beforeEach(() => {
  ({result, waitForNextUpdate} = renderHook(() => useFavouriteContext(), {
    wrapper,
  }));
});

afterAll(() => jest.clearAllMocks());

it('should add item to favourite list', async () => {
  await waitForNextUpdate();
  act(() => {
    result.current.addLiked!(mockDog);
  });
  expect(result.current.favourite).toHaveLength(1);
});

it('should not add item to favourite list if item is already in the list', async () => {
  await waitForNextUpdate();
  act(() => {
    result.current.addLiked!(mockDog);
  });
  act(() => {
    result.current.addLiked!(mockDog);
  });
  expect(result.current.favourite).toHaveLength(1);
});

it('should return item in favourite list initially', async () => {
  await waitForNextUpdate();
  expect(result.current.favourite).toHaveLength(1);
});
