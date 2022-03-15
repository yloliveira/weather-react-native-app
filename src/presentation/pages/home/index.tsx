import React, { useCallback, useEffect } from 'react';
import {
  ImageBackgroundContainer,
  SafeAreaContainer,
  ScrollContent,
  HeaderContainer,
  LocationTitle,
  DegreeText,
  WeatherText,
} from './styles';
import backgroundImage from './images/background.png';
import InfoCard from './components/InfoCard';
import { IWeatherModel } from '../../../domain/models/IWeather';
import { IRequestLocationPermission } from '../../../domain/usecases/IRequestLocationPermission';
import { IGetCurrentPosition } from '../../../domain/usecases/IGetCurrentPosition';

const DATA_MOCK: IWeatherModel = {
  city: 'Juiz de Fora',
  temperature: '29º',
  weather: 'Nublado',
  data: [
    {
      key: 'sunrise',
      title: 'Nascer do sol',
      value: '05:55',
    },
    {
      key: 'sunset',
      title: 'Pôr do sol',
      value: '18:55',
    },
    {
      key: 'temp_min',
      title: 'Temperatura Mínima',
      value: '10º',
    },
    {
      key: 'temp_max',
      title: 'Temperatura Máxima',
      value: '32º',
    },
    {
      key: 'feels_like',
      title: 'Sensação térmica',
      value: '30º',
    },
    {
      key: 'humidity',
      title: 'Umidade',
      value: '69%',
    },
    {
      key: 'visibility',
      title: 'Visibilidade',
      value: '13km',
    },
    {
      key: 'pressure',
      title: 'Pressão',
      value: '1012 hPa',
    },
    {
      key: 'wind_speed',
      title: 'Veliocidade do vento',
      value: '8 Km/h',
    },
  ],
};

type Props = {
  requestLocationPermission: IRequestLocationPermission;
  getCurrentPosition: IGetCurrentPosition;
};

const Home: React.FC<Props> = ({
  requestLocationPermission,
  getCurrentPosition,
}) => {
  const { city, temperature, weather, data } = DATA_MOCK;

  const renderListHeaderComponent = useCallback(() => {
    return (
      <HeaderContainer>
        <LocationTitle>{city}</LocationTitle>
        <DegreeText>{temperature}</DegreeText>
        <WeatherText>{weather}</WeatherText>
      </HeaderContainer>
    );
  }, [city, temperature, weather]);

  const renderItem = useCallback(({ item }) => {
    return <InfoCard item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.key, []);

  const loadWeatherData = useCallback(async () => {
    try {
      await requestLocationPermission.execute();
      const coordinates = await getCurrentPosition.execute();
      console.log(coordinates);
    } catch (error) {
      console.log(error);
    }
  }, [getCurrentPosition, requestLocationPermission]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  return (
    <ImageBackgroundContainer source={backgroundImage}>
      <SafeAreaContainer>
        <ScrollContent
          data={data}
          keyExtractor={keyExtractor}
          numColumns={3}
          ListHeaderComponent={renderListHeaderComponent}
          renderItem={renderItem}
        />
      </SafeAreaContainer>
    </ImageBackgroundContainer>
  );
};

export default Home;
