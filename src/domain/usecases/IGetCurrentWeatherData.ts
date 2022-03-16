import { IWeatherModel } from '../models/IWeather';

export interface IGetCurrentWeatherData {
  execute: (params: IGetCurrentWeatherData.Params) => Promise<any>;
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
