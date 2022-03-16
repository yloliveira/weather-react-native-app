import { UnexpectedError } from '../../domain/errors/UnexpectedError';
import { IGetCurrentWeatherData } from '../../domain/usecases/IGetCurrentWeatherData';
import { RemoteGetCurrentWeatherDataResponseAdapter } from './RemoteGetCurrentWeatherDataResponse';

export class GetCurrentWeatherDataMock implements IGetCurrentWeatherData {
  async execute(_params: IGetCurrentWeatherData.Params): Promise<any> {
    return;
  }
}

type SutTypes = {
  sut: RemoteGetCurrentWeatherDataResponseAdapter;
  getCurrentWeatherDataMock: IGetCurrentWeatherData;
};

const makeSut = (): SutTypes => {
  const getCurrentWeatherDataMock = new GetCurrentWeatherDataMock();

  const sut = new RemoteGetCurrentWeatherDataResponseAdapter(
    getCurrentWeatherDataMock,
  );
  return {
    sut,
    getCurrentWeatherDataMock,
  };
};

describe('RemoteGetCurrentWeatherDataResponseAdapter', () => {
  it('Should call remoteGetCurrentWeatherDataUseCase with correct values', async () => {
    const { sut, getCurrentWeatherDataMock } = makeSut();
    const getCurrentWeatherDataMockSpy = jest.spyOn(
      getCurrentWeatherDataMock,
      'execute',
    );

    const params = {
      latitude: -21.757793,
      longitude: -43.35372,
    };

    await sut.execute(params);

    expect(getCurrentWeatherDataMockSpy).toBeCalledWith(params);
  });

  it('Should return same remoteGetCurrentWeatherDataUseCase response if its throws an error', async () => {
    const { sut, getCurrentWeatherDataMock } = makeSut();
    jest
      .spyOn(getCurrentWeatherDataMock, 'execute')
      .mockRejectedValueOnce(new UnexpectedError());

    const params = {
      latitude: -21.757793,
      longitude: -43.35372,
    };

    const promise = sut.execute(params);

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
