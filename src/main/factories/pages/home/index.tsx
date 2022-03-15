import React from 'react';
import { Platform } from 'react-native';
import { PERMISSIONS } from 'react-native-permissions';
import Home from '../../../../presentation/pages/home';
import { RNPermissionsRequestLocationPermission } from '../../../../data/usecases/RequestLocationPermission/RNPermissionsRequestLocationPermission';
import { RNGeolocationServiceGetCurrentPosition } from '../../../../data/usecases/GetCurrentPosition/RNGeolocationServiceGetCurrentPosition';

const permission = Platform.select({
  ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  default: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
});

const rnPermissionRequestLocationPermission =
  new RNPermissionsRequestLocationPermission(permission);

const rnGeolocationServiceGetCurrentPosition =
  new RNGeolocationServiceGetCurrentPosition();

export const MakeHomePage: React.FC = () => {
  return (
    <Home
      requestLocationPermission={rnPermissionRequestLocationPermission}
      getCurrentPosition={rnGeolocationServiceGetCurrentPosition}
    />
  );
};
