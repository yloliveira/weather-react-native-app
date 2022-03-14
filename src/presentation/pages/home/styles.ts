import styled from 'styled-components/native';

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
