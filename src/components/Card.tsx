import * as React from 'react'
import { Card } from "antd";

interface IProps {
  name: string;
  url: string;
}

const UrlCard = ({ name, url }: IProps) => {
  return <Card title={name}>{url}</Card>;
};

export default UrlCard;
