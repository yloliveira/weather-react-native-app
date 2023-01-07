export interface IWeatherModelData {
  key: string;
  title: string;
  value: string;
}

export interface IWeatherModel {
  city: string;
  temperature: string;
  weather: string;
  data: IWeatherModelData[];
}
