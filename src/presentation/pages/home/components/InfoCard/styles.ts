import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH * 0.28;
const CARD_HEIGHT = CARD_WIDTH;

export const Card = styled.View`
  align-items: center;
  background-color: 'rgba(62, 130, 209, 0.8)';
  border-radius: 20px;
  height: ${CARD_WIDTH}px;
  justify-content: space-between;
  margin: 5px;
  padding: 20px 10px;
  width: ${CARD_HEIGHT}px;
`;

export const CardTitle = styled.Text`
  color: #fff;
  font-size: 14px;
  text-align: center;
`;

export const CardValue = styled.Text`
  color: #fff;
  font-size: 24px;
`;
