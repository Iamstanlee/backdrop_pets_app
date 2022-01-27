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

beforeEach(async () => {
  ({result, waitForNextUpdate} = renderHook(() => useFavouriteContext(), {
    wrapper,
  }));
  await waitForNextUpdate();
});

afterAll(() => jest.clearAllMocks());

it('should try error when useFavouriteContext is called without a FavouriteContextProvider parent', async () => {
  ({result} = renderHook(() => useFavouriteContext()));
  expect(result.error).toBeDefined();
});

it('should add item to favourite list', async () => {
  act(() => {
    result.current.addLiked!(mockDog);
  });
  expect(result.current.favourite).toHaveLength(1);
});

it('should not add item to favourite list if item is already in the list', async () => {
  act(() => {
    result.current.addLiked!(mockDog);
  });
  act(() => {
    result.current.addLiked!(mockDog);
  });
  expect(result.current.favourite).toHaveLength(1);
});

it('should return item in favourite list initially', async () => {
  expect(result.current.favourite).toHaveLength(1);
});
