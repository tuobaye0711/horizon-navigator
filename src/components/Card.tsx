import * as React from "react";
import { Card } from "antd";

// const { Meta } = Card;

interface IProps {
  name: string;
  url: string;
}

const UrlCard = ({ name, url }: IProps) => {
  return (
    <Card
      hoverable={true}
      onClick={() => {
        window.open(url);
      }}
    >
      {name}
    </Card>
  );
};

export default UrlCard;
