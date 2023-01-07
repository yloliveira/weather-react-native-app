import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import {
  IWeatherModel,
  IWeatherModelData,
} from '../../../domain/models/IWeather';
import { IRequestLocationPermission } from '../../../domain/usecases/IRequestLocationPermission';
import { IGetCurrentPosition } from '../../../domain/usecases/IGetCurrentPosition';
import { IGetCurrentWeatherData } from '../../../domain/usecases/IGetCurrentWeatherData';
import backgroundImage from './images/background.png';
import {
  ImageBackgroundContainer,
  SafeAreaContainer,
  Card,
  CardTitle,
  CardValue,
  LoadingContainer,
  ScrollContent,
  ErrorContainer,
  ErrorText,
  HeaderContainer,
  RefreshButtonContainer,
  RefreshText,
  LocationTitle,
  DegreeText,
  WeatherText,
} from './styles';

const HOME_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

type InfoCardProps = {
  item: {
    title: string;
    value: string;
  };
};

const InfoCard: React.FC<InfoCardProps> = ({ item }) => {
  return (
    <Card>
      <CardTitle>{item.title}</CardTitle>
      <CardValue>{item.value}</CardValue>
    </Card>
  );
};

type ListProps = {
  requestLocationPermission: IRequestLocationPermission;
  getCurrentPosition: IGetCurrentPosition;
  getCurrentWeatherData: IGetCurrentWeatherData;
};

const List: React.FC<ListProps> = ({
  requestLocationPermission,
  getCurrentPosition,
  getCurrentWeatherData,
}) => {
  const [state, setState] = useState<{
    status: string;
    weatherData?: IWeatherModel;
    error?: Error;
  }>({
    status: HOME_STATUS.PENDING,
    weatherData: undefined,
    error: undefined,
  });

  const handleRefresh = () => {
    setState({ status: HOME_STATUS.PENDING });
    loadData();
  };

  const loadData = useCallback(() => {
    requestLocationPermission
      .execute()
      .then(() => getCurrentPosition.execute())
      .then(coordinates => getCurrentWeatherData.execute(coordinates))
      .then(response => {
        setState({
          status: HOME_STATUS.RESOLVED,
          weatherData: response.result,
        });
      })
      .catch(error => {
        setState({ status: HOME_STATUS.REJECTED, error });
      });
  }, [getCurrentPosition, getCurrentWeatherData, requestLocationPermission]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const content = () => {
    if (state.status === HOME_STATUS.PENDING) {
      return (
        <LoadingContainer enable={state.status === HOME_STATUS.PENDING}>
          <ActivityIndicator size="large" color="#000" />
        </LoadingContainer>
      );
    }

    if (state.status === HOME_STATUS.REJECTED) {
      return (
        <ErrorContainer>
          <ErrorText>
            Não foi possível obter os dados dessa vez.{'\n'}
            Verifique sua conexão e tente novamente.
          </ErrorText>
        </ErrorContainer>
      );
    }

    const renderItem = ({ item }: any) => {
      return <InfoCard item={item as IWeatherModelData} />;
    };

    return (
      <ScrollContent
        data={state?.weatherData?.data}
        keyExtractor={(item: any) => item.key}
        numColumns={2}
        renderItem={renderItem}
      />
    );
  };

  return (
    <>
      <HeaderContainer>
        <RefreshButtonContainer onPress={handleRefresh}>
          <RefreshText>Atualizar</RefreshText>
        </RefreshButtonContainer>
        <LocationTitle>{state?.weatherData?.city}</LocationTitle>
        <DegreeText>{state?.weatherData?.temperature}</DegreeText>
        <WeatherText>{state?.weatherData?.weather}</WeatherText>
      </HeaderContainer>
      {content()}
    </>
  );
};

type HomeProps = {
  requestLocationPermission: IRequestLocationPermission;
  getCurrentPosition: IGetCurrentPosition;
  getCurrentWeatherData: IGetCurrentWeatherData;
};

const Home: React.FC<HomeProps> = ({
  requestLocationPermission,
  getCurrentPosition,
  getCurrentWeatherData,
}) => {
  return (
    <ImageBackgroundContainer source={backgroundImage}>
      <SafeAreaContainer>
        <List
          requestLocationPermission={requestLocationPermission}
          getCurrentPosition={getCurrentPosition}
          getCurrentWeatherData={getCurrentWeatherData}
        />
      </SafeAreaContainer>
    </ImageBackgroundContainer>
  );
};

export default Home;
