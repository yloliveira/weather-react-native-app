import { UnexpectedError } from '../../../domain/errors/UnexpectedError';
import {
  IHttpClient,
  HttpMethod,
  HttpStatusCode,
} from '../../../data/protocols/http/IHttpClient';
import { IGetCurrentWeatherData } from '../../../domain/usecases/IGetCurrentWeatherData';

export type OpenWeatherApiResponse = {
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  name: string;
};

export class RemoteGetCurrentWeatherData
  implements IGetCurrentWeatherData<OpenWeatherApiResponse>
{
  constructor(
    private readonly apiKey: string,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(
    params: IGetCurrentWeatherData.Params,
  ): Promise<OpenWeatherApiResponse> {
    const response = await this.httpClient.request({
      url: 'https://api.openweathermap.org/data/2.5/weather',
      method: HttpMethod.get,
      params: {
        lat: params.latitude,
        lon: params.longitude,
        appid: this.apiKey,
        units: 'metric',
        lang: 'pt_br',
      },
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      default:
        throw new UnexpectedError();
    }
  }
}
