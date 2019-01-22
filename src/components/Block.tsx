import * as React from "react";
import UrlCard from "../components/Card";
import store from "store";

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
        .map((i, idx) => {
          if (!store.get(category + idx)) {
            store.set(category + idx, i);
          }
          const card = store.get(category + idx);
          return (
            <UrlCard
              name={card.name}
              url={card.url}
              key={card.weight}
              position={category + idx}
              weight={card.weight}
              category={category}
            />
          );
        })}
    </div>
  );
};

export default Block;
