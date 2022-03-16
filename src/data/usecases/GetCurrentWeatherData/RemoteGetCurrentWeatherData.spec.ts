import { RemoteGetCurrentWeatherData } from './RemoteGetCurrentWeatherData';
import { IGetCurrentWeatherData } from '../../../domain/usecases/IGetCurrentWeatherData';
import { MockHttpClient } from '../../../data/mocks/MockHttpClient';
import { HttpMethod } from '../../../data/protocols/http/IHttpClient';

type SutTypes = {
  sut: IGetCurrentWeatherData;
  httpClientMock: MockHttpClient<IGetCurrentWeatherData.Model>;
};

const makeSut = (): SutTypes => {
  const httpClientMock = new MockHttpClient<IGetCurrentWeatherData.Model>();
  const sut = new RemoteGetCurrentWeatherData('valid_url', httpClientMock);
  return { sut, httpClientMock };
};

describe('RemoteGetCurrentWeatherDataUseCase', () => {
  it('Should call HttpClient with correct values', async () => {
    const { sut, httpClientMock } = makeSut();

    const params = {
      latitude: -21.757793,
      longitude: -43.35372,
    };

    await sut.execute(params);

    expect(httpClientMock.url).toBe('valid_url');
    expect(httpClientMock.method).toBe(HttpMethod.get);
    expect(httpClientMock.params).toEqual(params);
  });
});
