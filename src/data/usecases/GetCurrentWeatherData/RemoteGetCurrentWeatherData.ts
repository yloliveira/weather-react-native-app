import {
  IHttpClient,
  HttpMethod,
} from '../../../data/protocols/http/IHttpClient';
import { IGetCurrentWeatherData } from '../../../domain/usecases/IGetCurrentWeatherData';

export class RemoteGetCurrentWeatherData implements IGetCurrentWeatherData {
  constructor(
    private readonly url: string,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(
    params: IGetCurrentWeatherData.Params,
  ): Promise<IGetCurrentWeatherData.Model | undefined> {
    const response = await this.httpClient.request({
      url: this.url,
      method: HttpMethod.get,
      params,
    });
    return response.body;
  }
}
