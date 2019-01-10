import * as React from "react";
import { Input, Select } from "antd";

const SearchList = require("../constant/search.json");
const Search = Input.Search;
const { Option } = Select;

interface IProps {
  className: string;
}

interface ISearch {
  name: string;
  show: string;
  url: string;
  description: string;
}

let type: ISearch = SearchList[0];

const handleChange = value => {
  type = SearchList.filter(i => i.name === value)[0];
  console.log("​type", type);
};

const menu = (
  <Select
    defaultValue={SearchList[0].name}
    onChange={handleChange}
    style={{ width: 90 }}
  >
    {SearchList.map(i => (
      <Option key={i.name} value={i.name}>
        {i.show}
      </Option>
    ))}
  </Select>
);

const Searcher = ({ className }: IProps) => {
  return (
    <div className={className}>
      <Search
        placeholder={type.description}
        enterButton="Search"
        allowClear={true}
        size="large"
        addonBefore={menu}
        onSearch={value => {
          window.open(type.url + value);
        }}
      />
    </div>
  );
};

export default Searcher;
