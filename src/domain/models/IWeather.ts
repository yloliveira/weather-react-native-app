export interface IWeatherModel {
  city: string;
  temperature: string;
  weather: string;
  data: {
    key: string;
    title: string;
    value: string;
  }[];
}
