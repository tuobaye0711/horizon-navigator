import * as React from "react";
import { Input } from "antd";

const Search = Input.Search;

interface IProps {
  type: string;
  className: string;
}

const Searcher = ({ type, className }: IProps) => {
  return (
    <div className={className}>
      <Search
        placeholder="谷歌一下，你就知道"
        enterButton="Search"
        size="large"
        onSearch={value => {
          switch (type) {
            case "google":
              window.open(`https://www.google.com/search?q=${value}`);
              break;
            default:
              window.open(`https://www.baidu.com/s?wd=${value}`);
          }
        }}
      />
    </div>
  );
};

export default Searcher;
