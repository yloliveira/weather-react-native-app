import { IGetCurrentWeatherData } from '../../domain/usecases/IGetCurrentWeatherData';

export class RemoteGetCurrentWeatherDataResponseAdapter
  implements IGetCurrentWeatherData
{
  constructor(
    private readonly remoteGetCurrentWeatherData: IGetCurrentWeatherData,
  ) {}

  async execute(data: IGetCurrentWeatherData.Params): Promise<any> {
    const response = await this.remoteGetCurrentWeatherData.execute(data);
    if (response) {
      return {
        result: this.buildResponseResult(response),
      };
    }

    return response;
  }

  private buildResponseResult(data: any) {
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
