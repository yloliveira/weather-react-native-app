jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn().mockImplementation(successCallback =>
    successCallback({
      coords: {
        latitude: -21.746294,
        longitude: -43.354946,
        accuracy: 100,
        altitude: null,
        heading: null,
        speed: null,
        altitudeAccuracy: null,
      },
      timestamp: 123123,
      mocked: false,
      provider: 'gps',
    }),
  ),
}));
