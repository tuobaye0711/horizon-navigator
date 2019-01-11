import * as React from "react";
import { PureComponent } from "react";
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

interface IState {
  type: ISearch;
}

class Searcher extends PureComponent<IProps, IState> {
  public state: IState = {
    type: SearchList[0]
  };

  public menu = (
    <Select
      defaultValue={SearchList[0].name}
      onChange={this.handleChange}
      style={{ width: 90 }}
    >
      {SearchList.map(i => (
        <Option key={i.name} value={i.name}>
          {i.show}
        </Option>
      ))}
    </Select>
  );
  
  constructor(props) {
    super(props);
  }

  public handleChange = value => {
    this.setState({
      type: SearchList.filter(i => i.name === value)[0]
    });
  };

  public render() {
    const { className }: IProps = this.props;
    const { type }: IState = this.state;
    console.log("​Searcher -> type", type);
    return (
      <div className={className}>
        <Search
          placeholder={type.description}
          enterButton="Search"
          allowClear={true}
          size="large"
          addonBefore={this.menu}
          onSearch={value => {
            window.open(type.url + value);
          }}
        />
      </div>
    );
  }
}

export default Searcher;
