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

  async execute(params: IGetCurrentWeatherData.Params): Promise<any> {
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
        return response.body;
      default:
        throw new UnexpectedError();
    }
  }
}
