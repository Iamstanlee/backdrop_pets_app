import {renderHook, RenderResult} from '@testing-library/react-hooks';
import {Dog} from '../../src/types';
import {mockResponse} from '../../__mocks__/mock_data';
import useFetch from '../../src/hooks/use_fetch';

const fetchMock = () =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(mockResponse as any),
  });

let result: RenderResult<any>,
  waitForNextUpdate: (options?: {timeout?: number | false}) => Promise<void>,
  rerender: (newProps?: any) => void;

let initialProps: number;

beforeEach(() => {
  initialProps = 0;
  global.fetch = jest.fn(fetchMock) as jest.Mock;
  ({result, waitForNextUpdate, rerender} = renderHook(
    props => useFetch<Dog[]>(props),
    {
      initialProps: initialProps,
    },
  ));
});

afterAll(() => jest.clearAllMocks());

it('should return data on success requests', async () => {
  await waitForNextUpdate();

  expect(result.current.data).toBe(mockResponse);
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBeUndefined();
});

it('should return error message when request failed', async () => {
  const errMsg = 'an error occurred';
  global.fetch = (jest.fn(fetchMock) as jest.Mock).mockRejectedValueOnce(
    new Error(errMsg),
  );
  rerender(++initialProps);
  await waitForNextUpdate();

  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.error).toBe(errMsg);
});

it('should not fetch data unless page props changes', async () => {
  await waitForNextUpdate();
  rerender(initialProps);
  expect(result.current.isFetching).toBeFalsy();

  rerender(++initialProps);
  expect(result.current.isLoading).toBeFalsy();
  expect(result.current.isFetching).toBeTruthy();
  await waitForNextUpdate();
  expect(result.current.isFetching).toBeFalsy();
});
