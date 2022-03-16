import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

type LoadingContainerProps = {
  enable: boolean;
};

type ErrorContainerProps = {
  disable: boolean;
};

const DefaultText = styled.Text`
  color: #fff;
`;

export const ImageBackgroundContainer = styled.ImageBackground`
  flex: 1;
`;

export const SafeAreaContainer = styled.SafeAreaView`
  background-color: 'rgba(0, 0, 0, 0.2)';
  flex: 1;
`;

export const LoadingContainer = styled.View<LoadingContainerProps>`
  align-items: center;
  display: ${props => (props.enable ? 'flex' : 'none')};
  width: ${Dimensions.get('window').width}px;
  height: ${Dimensions.get('window').height}px;
  justify-content: center;
  position: absolute;
  z-index: 1;
`;

export const ScrollContent = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: 10,
  },
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-around',
    marginBottom: 20,
  },
}))``;

export const RefreshButtonContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin: 10px 0 40px;
  width: 100px;
  height: 40px;
  border-radius: 30px;
  background-color: 'rgba(62, 130, 209, 0.8)';
`;

export const RefreshText = styled(DefaultText)`
  font-size: 18px;
`;

export const ErrorContainer = styled.View<ErrorContainerProps>`
  display: ${props => (props.disable ? 'none' : 'flex')};
  align-items: center;
`;

export const ErrorText = styled(DefaultText)`
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  line-height: 34px;
`;

export const HeaderContainer = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

export const LocationTitle = styled(DefaultText)`
  font-size: 30px;
`;

export const DegreeText = styled(DefaultText)`
  font-size: 50px;
`;

export const WeatherText = styled(DefaultText)`
  font-size: 18px;
`;
