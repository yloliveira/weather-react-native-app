import React, { useCallback } from 'react';
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

const DATA_MOCK = {
  city: 'Juiz de Fora',
  temperature: 29,
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
      title: 'Min',
      value: 10,
    },
    {
      key: 'temp_max',
      title: 'Max',
      value: 32,
    },
    {
      key: 'feels_like',
      title: 'Sensação',
      value: 30,
    },
    {
      key: 'humidity',
      title: 'Umidade',
      value: 100,
    },
    {
      key: 'visibility',
      title: 'Visibilidade',
      value: '16km',
    },
    {
      key: 'pressure',
      title: 'Pressão',
      value: 1023,
    },
    {
      key: 'wind_speed',
      title: 'Veliocidade do vento',
      value: 1.5,
    },
    {
      key: 'pressure',
      title: 'Pressão',
      value: 1023,
    },
  ],
};

const Home: React.FC = () => {
  const { city, temperature, weather, data } = DATA_MOCK;

  const renderListHeaderComponent = useCallback(() => {
    return (
      <HeaderContainer>
        <LocationTitle>{city}</LocationTitle>
        <DegreeText>{temperature}º</DegreeText>
        <WeatherText>{weather}</WeatherText>
      </HeaderContainer>
    );
  }, [city, temperature, weather]);

  const renderItem = useCallback(({ item }) => {
    return <InfoCard item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.key, []);

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
