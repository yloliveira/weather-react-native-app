import Geolocation from 'react-native-geolocation-service';
import {
  IGetCurrentPosition,
  Coordinates,
} from 'domain/usecases/IGetCurrentPosition';

export class RNGeolocationServiceGetCurrentPosition
  implements IGetCurrentPosition
{
  async execute(): Promise<Coordinates> {
    return new Promise((resolve, reject) =>
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        () => {
          reject(new Error('Unable to get current position'));
        },
      ),
    );
  }
}
