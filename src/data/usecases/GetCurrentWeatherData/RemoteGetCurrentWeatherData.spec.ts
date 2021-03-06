import { RemoteGetCurrentWeatherData } from './RemoteGetCurrentWeatherData';
import { IGetCurrentWeatherData } from '../../../domain/usecases/IGetCurrentWeatherData';
import { MockHttpClient } from '../../../data/mocks/MockHttpClient';
import {
  HttpMethod,
  HttpStatusCode,
} from '../../../data/protocols/http/IHttpClient';
import { UnexpectedError } from '../../../domain/errors/UnexpectedError';

type SutTypes = {
  sut: IGetCurrentWeatherData;
  httpClientMock: MockHttpClient<IGetCurrentWeatherData.Model>;
};

const makeSut = (apiKey: string): SutTypes => {
  const httpClientMock = new MockHttpClient<IGetCurrentWeatherData.Model>();
  const sut = new RemoteGetCurrentWeatherData(apiKey, httpClientMock);
  return { sut, httpClientMock };
};

describe('RemoteGetCurrentWeatherDataUseCase', () => {
  it('Should call HttpClient with correct values', async () => {
    const apiKey = 'valid_api_key';
    const { sut, httpClientMock } = makeSut(apiKey);

    const params = {
      latitude: -21.757793,
      longitude: -43.35372,
    };

    await sut.execute(params);

    expect(httpClientMock.method).toBe(HttpMethod.get);
    expect(httpClientMock.params).toEqual({
      lat: params.latitude,
      lon: params.longitude,
      appid: apiKey,
      units: 'metric',
      lang: 'pt_br',
    });
  });

  test('Should throw UnexpectedError if HttpClient returns error', async () => {
    const apiKey = 'valid_api_key';
    const { sut, httpClientMock } = makeSut(apiKey);
    const params = {
      latitude: -21.757793,
      longitude: -43.35372,
    };

    httpClientMock.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
