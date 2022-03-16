import React from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import config from '../../../../config';
import Home from '../../../../presentation/pages/home';
import { RNPermissionsRequestLocationPermission } from '../../../../data/usecases/RequestLocationPermission/RNPermissionsRequestLocationPermission';
import { RNGeolocationServiceGetCurrentPosition } from '../../../../data/usecases/GetCurrentPosition/RNGeolocationServiceGetCurrentPosition';
import { AxiosHttpClient } from '../../../../infra/http/AxiosHttpClient';
import { RemoteGetCurrentWeatherData } from '../../../../data/usecases/GetCurrentWeatherData/RemoteGetCurrentWeatherData';

const permission = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});

const rnPermissionRequestLocationPermission =
  new RNPermissionsRequestLocationPermission(permission);

const rnGeolocationServiceGetCurrentPosition =
  new RNGeolocationServiceGetCurrentPosition();

const axiosHttpClient = new AxiosHttpClient();

const remoteGetCurrentWeatherData = new RemoteGetCurrentWeatherData(
  `${config.env.OPEN_WEATHER_API_URL}weather`,
  config.env.OPEN_WEATHER_API_KEY,
  axiosHttpClient,
);

export const MakeHomePage: React.FC = () => {
  return (
    <Home
      requestLocationPermission={rnPermissionRequestLocationPermission}
      getCurrentPosition={rnGeolocationServiceGetCurrentPosition}
      getCurrentWeatherData={remoteGetCurrentWeatherData}
    />
  );
};
