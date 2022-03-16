import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

type LoadingContainerProps = {
  enable: boolean;
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
`;

export const ScrollContent = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: 10,
  },
}))``;

export const HeaderContainer = styled.View`
  align-items: center;
  margin: 40px 0;
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
