export interface ICheckLocationPermission {
  execute: () => Promise<boolean>;
}
