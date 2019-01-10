import * as React from "react";
import UrlCard from "../components/Card";

interface IProps {
  category: string;
  websites: any;
  className: string;
}

const Block = ({ category, websites, className }: IProps) => {
  return (
    <div className={className}>
      <div>{category}</div>
      {websites
        .filter(w => w.category === category)
        .slice(0, 9)
        .map(i => (
          <UrlCard name={i.name} url={i.url} key={i.weight} />
        ))}
    </div>
  );
};

export default Block;
