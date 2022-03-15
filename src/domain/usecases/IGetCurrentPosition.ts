export type Coordinates = {
  latitude: number;
  longitude: number;
};

export interface IGetCurrentPosition {
  execute: () => Promise<Coordinates>;
}
