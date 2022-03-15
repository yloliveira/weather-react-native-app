import { RNGeolocationServiceGetCurrentPosition } from './RNGeolocationServiceGetCurrentPosition';
import Geolocation from 'react-native-geolocation-service';
import { IGetCurrentPosition } from '../../../domain/usecases/IGetCurrentPosition';

type SutTypes = {
  sut: IGetCurrentPosition;
};

const makeSut = (): SutTypes => {
  const sut = new RNGeolocationServiceGetCurrentPosition();
  return { sut };
};

describe('RNGeolocationServiceGetCurrentPositionUseCase', () => {
  it('Should return coordinates correctly', async () => {
    const { sut } = makeSut();
    const rnGeolocationSpy = jest.spyOn(Geolocation, 'getCurrentPosition');

    const coordinates = await sut.execute();

    expect(rnGeolocationSpy).toBeCalled();
    expect(coordinates).toHaveProperty('latitude');
    expect(coordinates).toHaveProperty('longitude');
  });

  it('Should throw an error if it doesn`t get coordinates', async () => {
    const { sut } = makeSut();
    const rnGeolocationSpy = jest
      .spyOn(Geolocation, 'getCurrentPosition')
      .mockImplementationOnce(
        (successCallback, errorCallback) =>
          errorCallback && errorCallback({ code: 1, message: 'error' }),
      );

    const promise = sut.execute();

    expect(rnGeolocationSpy).toBeCalled();
    await expect(promise).rejects.toThrow(
      new Error('Unable to get current position'),
    );
  });
});
