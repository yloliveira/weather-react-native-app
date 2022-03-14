import React from 'react';
import { Card, CardTitle, CardValue } from './styles';

type Props = {
  item: {
    title: string;
    value: string;
  };
};

const InfoCard: React.FC<Props> = ({ item }) => {
  return (
    <Card>
      <CardTitle>{item.title}</CardTitle>
      <CardValue>{item.value}</CardValue>
    </Card>
  );
};

export default InfoCard;
