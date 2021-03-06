import { IWeatherModel } from 'domain/models/IWeather';
import { OpenWeatherApiResponse } from '../../data/usecases/GetCurrentWeatherData/RemoteGetCurrentWeatherData';
import { IGetCurrentWeatherData } from '../../domain/usecases/IGetCurrentWeatherData';

type AdapterResponse = {
  result: IWeatherModel;
};

export class RemoteGetCurrentWeatherDataResponseAdapter
  implements IGetCurrentWeatherData<AdapterResponse>
{
  constructor(
    private readonly remoteGetCurrentWeatherData: IGetCurrentWeatherData,
  ) {}

  async execute(data: IGetCurrentWeatherData.Params): Promise<AdapterResponse> {
    const response = await this.remoteGetCurrentWeatherData.execute(data);
    if (response) {
      return {
        result: this.buildResponseResult(response),
      };
    }

    return response;
  }

  private buildResponseResult(data: OpenWeatherApiResponse): IWeatherModel {
    const city = data.name;
    const temperature = `${data.main.temp.toFixed(0)}º`;
    const weather = data.weather[0].description;
    const tempMin = `${data.main.temp_min.toFixed(0)}º`;
    const tempMax = `${data.main.temp_max.toFixed(0)}º`;
    const feelsLike = `${data.main.feels_like.toFixed(0)}º`;
    const humidity = `${data.main.humidity}%`;
    const visibility = `${data.visibility / 1000}km`;
    const pressure = `${data.main.pressure} hPa`;
    const windSpeed = `${data.wind.speed.toFixed(1)} km/h`;

    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunrise = `${sunriseDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${sunriseDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const sunsetDate = new Date(data.sys.sunset * 1000);
    const sunset = `${sunsetDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${sunsetDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    return {
      city,
      temperature,
      weather,
      data: [
        {
          key: 'sunrise',
          title: 'Nascer do sol',
          value: sunrise,
        },
        {
          key: 'sunset',
          title: 'Pôr do sol',
          value: sunset,
        },
        {
          key: 'temp_min',
          title: 'Temperatura Mínima',
          value: tempMin,
        },
        {
          key: 'temp_max',
          title: 'Temperatura Máxima',
          value: tempMax,
        },
        {
          key: 'feels_like',
          title: 'Sensação térmica',
          value: feelsLike,
        },
        {
          key: 'humidity',
          title: 'Umidade',
          value: humidity,
        },
        {
          key: 'visibility',
          title: 'Visibilidade',
          value: visibility,
        },
        {
          key: 'pressure',
          title: 'Pressão',
          value: pressure,
        },
        {
          key: 'wind_speed',
          title: 'Velocidade do Vento',
          value: windSpeed,
        },
      ],
    };
  }
}
