import { IWeatherModel } from '../models/IWeather';

export interface IGetCurrentWeatherData<R = any> {
  execute: (params: IGetCurrentWeatherData.Params) => Promise<R>;
}

export namespace IGetCurrentWeatherData {
  export type Params = {
    latitude?: number;
    longitude?: number;
  };

  export type Model = {
    result: IWeatherModel;
  };
}
