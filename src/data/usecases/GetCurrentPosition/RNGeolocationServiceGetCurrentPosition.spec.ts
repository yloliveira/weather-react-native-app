import { RNGeolocationServiceGetCurrentPosition } from './RNGeolocationServiceGetCurrentPosition';
import Geolocation from 'react-native-geolocation-service';

const makeSut = () => {
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
});
