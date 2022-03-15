import Geolocation from 'react-native-geolocation-service';
import {
  IGetCurrentPosition,
  Coordinates,
} from 'domain/usecases/IGetCurrentPosition';

export class RNGeolocationServiceGetCurrentPosition
  implements IGetCurrentPosition
{
  async execute(): Promise<Coordinates> {
    const position = (await new Promise((resolve, reject) =>
      Geolocation.getCurrentPosition(
        coords => resolve(coords),
        error => reject(error),
      ),
    )) as Geolocation.GeoPosition;

    const { latitude, longitude } = position.coords;
    return { latitude, longitude };
  }
}
