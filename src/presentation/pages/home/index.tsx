import React, { useCallback, useEffect, useState } from 'react';
import {
  ImageBackgroundContainer,
  SafeAreaContainer,
  LoadingContainer,
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
import { IGetCurrentWeatherData } from 'domain/usecases/IGetCurrentWeatherData';
import { ActivityIndicator } from 'react-native';

type Props = {
  requestLocationPermission: IRequestLocationPermission;
  getCurrentPosition: IGetCurrentPosition;
  getCurrentWeatherData: IGetCurrentWeatherData;
};

const Home: React.FC<Props> = ({
  requestLocationPermission,
  getCurrentPosition,
  getCurrentWeatherData,
}) => {
  const [weatherData, setWeatherData] = useState<IWeatherModel | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(true);

  const renderListHeaderComponent = useCallback(() => {
    return (
      <HeaderContainer>
        <LocationTitle>{weatherData?.city}</LocationTitle>
        <DegreeText>{weatherData?.temperature}</DegreeText>
        <WeatherText>{weatherData?.weather}</WeatherText>
      </HeaderContainer>
    );
  }, [weatherData]);

  const renderItem = useCallback(({ item }) => {
    return <InfoCard item={item} />;
  }, []);

  const keyExtractor = useCallback(item => item.key, []);

  const loadWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      await requestLocationPermission.execute();
      const coordinates = await getCurrentPosition.execute();
      const response = await getCurrentWeatherData.execute(coordinates);

      if (!response?.result) {
        throw new Error();
      }

      setWeatherData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [getCurrentPosition, getCurrentWeatherData, requestLocationPermission]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  return (
    <ImageBackgroundContainer source={backgroundImage}>
      <SafeAreaContainer>
        <LoadingContainer enable={loading}>
          <ActivityIndicator size="large" color="#000" />
        </LoadingContainer>
        <ScrollContent
          data={weatherData?.data}
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
