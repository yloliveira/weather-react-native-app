import { UnexpectedError } from '../../../domain/errors/UnexpectedError';
import {
  IHttpClient,
  HttpMethod,
  HttpStatusCode,
} from '../../../data/protocols/http/IHttpClient';
import { IGetCurrentWeatherData } from '../../../domain/usecases/IGetCurrentWeatherData';

export class RemoteGetCurrentWeatherData implements IGetCurrentWeatherData {
  constructor(
    private readonly url: string,
    private readonly apiKey: string,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(
    params: IGetCurrentWeatherData.Params,
  ): Promise<IGetCurrentWeatherData.Model | undefined> {
    const response = await this.httpClient.request({
      url: this.url,
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
        return {
          result: this.buildResponseBody(response.body),
        };
      default:
        throw new UnexpectedError();
    }
  }

  private buildResponseBody(data: any) {
    return {
      city: data.name,
      temperature: data.main.temp.toFixed(0),
      weather: data.weather[0].description,
      data: [
        {
          key: 'sunrise',
          title: 'Nascer do sol',
          value: data.sys.sunrise,
        },
        {
          key: 'sunset',
          title: 'Pôr do sol',
          value: data.sys.sunset,
        },
        {
          key: 'temp_min',
          title: 'Temperatura Mínima',
          value: data.main.temp_min,
        },
        {
          key: 'temp_max',
          title: 'Temperatura Máxima',
          value: data.main.temp_max,
        },
        {
          key: 'feels_like',
          title: 'Sensação térmica',
          value: data.main.feels_like,
        },
        {
          key: 'humidity',
          title: 'Umidade',
          value: data.main.humidity,
        },
        {
          key: 'visibility',
          title: 'Visibilidade',
          value: data.visibility,
        },
        {
          key: 'pressure',
          title: 'Pressão',
          value: data.main.pressure,
        },
        {
          key: 'wind_speed',
          title: 'Veliocidade do vento',
          value: data.wind.speed,
        },
      ],
    };
  }
}
