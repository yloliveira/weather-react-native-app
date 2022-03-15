import axios from 'axios';
import {
  IHttpClient,
  HttpRequest,
  HttpMethod,
} from '../../data/protocols/http/IHttpClient';
import { AxiosHttpClient } from './AxiosHttpClient';

jest.mock('axios');

const mockHttpRequest = (): HttpRequest => ({
  url: 'valid_url',
  method: HttpMethod.get,
  headers: {
    authorization: 'valid_token',
  },
  params: {
    param1: 'valid_param1',
    param2: 'valid_param2',
  },
  body: {
    field1: 'valid_field1',
    field2: 'valid_field2',
  },
});

const mockHttpResponse = (): any => ({
  status: 200,
  data: {},
});

const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.request.mockClear().mockResolvedValue(mockHttpResponse());
  return mockedAxios;
};

type SutTypes = {
  sut: IHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  it('Should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockHttpRequest();

    await sut.request(request);

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      headers: request.headers,
      params: request.params,
      data: request.body,
    });
  });

  it('Should return correct response', async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockHttpRequest();

    const httpResponse = await sut.request(request);
    const axiosResponse = await mockedAxios.request.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    });
  });

  it('Should return correct error', async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockHttpRequest();
    const response = mockHttpResponse();

    mockedAxios.request.mockRejectedValueOnce({
      response,
    });

    const promise = await sut.request(request);

    expect(promise).toEqual({
      statusCode: response.status,
      body: response.data,
    });
  });
});
